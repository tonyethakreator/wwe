#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const crypto = require('crypto');

function walkDir(dir, exts = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(full, exts));
    } else {
      if (exts.length === 0 || exts.includes(path.extname(full))) {
        results.push(full);
      }
    }
  });
  return results;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // handle redirects (resolve relative locations)
        const loc = res.headers.location.startsWith('/') && /^https?:\/\//.test(url)
          ? new URL(res.headers.location, url).toString()
          : res.headers.location;
        return resolve(download(loc, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url} - Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => reject(err));
    });
    req.on('error', err => reject(err));
    // timeout
    req.setTimeout(15000, () => {
      req.abort();
      reject(new Error('Request timeout'));
    });
  });
}

function extractUrlsFromContent(content) {
  const urls = new Set();

  // https?:// or protocol-less //
  const httpRegex = /(?:https?:)?\/\/[^\s"'\)\>]+?\.(?:png|jpe?g|webp|svg)(?:\?[^\s"'\)\>]*)?/gi;
  let m;
  while ((m = httpRegex.exec(content)) !== null) {
    let u = m[0];
    // skip protocol-less MIME like //example.com -> normalize to https
    if (u.startsWith('//')) u = 'https:' + u;
    // ignore data URIs
    if (u.startsWith('data:')) continue;
    urls.add(u);
  }

  // CSS url(...) patterns (may include quotes)
  const cssUrl = /url\(\s*['"]?(https?:)?\/\/[^'"\)]+?\.(?:png|jpe?g|webp|svg)(?:\?[^'"\)]*)?['"]?\s*\)/gi;
  while ((m = cssUrl.exec(content)) !== null) {
    let u = m[0].replace(/url\(|\)|['"]/gi, '').trim();
    if (u.startsWith('http:') || u.startsWith('https:') || u.startsWith('//')) {
      if (u.startsWith('//')) u = 'https:' + u;
      urls.add(u);
    }
  }

  // srcset attribute (comma separated list)
  const srcsetRegex = /(?:srcset|data-srcset)\s*=\s*['"]([^'"]+)['"]/gi;
  while ((m = srcsetRegex.exec(content)) !== null) {
    const parts = m[1].split(',');
    parts.forEach(p => {
      const urlPart = p.trim().split(/\s+/)[0];
      if (/^(?:https?:)?\/\//.test(urlPart)) {
        const u = urlPart.startsWith('//') ? 'https:' + urlPart : urlPart;
        urls.add(u);
      }
    });
  }

  // data-src or data-original attributes that contain https
  const dataSrc = /(?:data-src|data-original|data-lazy)\s*=\s*['"](https?:[^'"]+)['"]/gi;
  while ((m = dataSrc.exec(content)) !== null) {
    urls.add(m[1]);
  }

  return Array.from(urls);
}

async function main() {
  const distDirArg = process.argv[2];
  const distDir = distDirArg ? path.resolve(distDirArg) : path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    console.log('No dist directory found at', distDir);
    return;
  }

  // Files to scan for remote urls: dist plus some source locations (project root and src)
  const scanDirs = [distDir, path.resolve(__dirname, '../../'), path.resolve(__dirname, '../')];
  const filesToScan = new Set();
  scanDirs.forEach(d => {
    walkDir(d, ['.html', '.js', '.css', '.md', '.txt']).forEach(f => {
      // only include files that actually exist and are not binary
      filesToScan.add(f);
    });
  });

  const allFiles = Array.from(filesToScan);
  if (allFiles.length === 0) {
    console.log('No files found to scan under', scanDirs.join(', '));
    return;
  }

  const found = new Map();
  allFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const urls = extractUrlsFromContent(content);
      urls.forEach(u => found.set(u, true));
    } catch (err) {
      // ignore read errors
    }
  });

  if (found.size === 0) {
    console.log('No remote images found to download.');
    return;
  }

  const remoteDir = path.join(distDir, 'assets', 'images', 'remote');
  if (!fs.existsSync(remoteDir)) fs.mkdirSync(remoteDir, { recursive: true });

  console.log(`Found ${found.size} remote image(s). Downloading to ${path.relative(process.cwd(), remoteDir)}...`);

  // Only rewrite files inside dist
  const distFiles = walkDir(distDir, ['.html', '.js', '.css']);

  for (const rawUrl of found.keys()) {
    const url = rawUrl; // already normalized in extract
    try {
      const extMatch = url.match(/\.([a-zA-Z0-9]+)(?:[\?\#]|$)/);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
      const hash = crypto.createHash('md5').update(url).digest('hex');
      const filename = `${hash}.${ext}`;
      const dest = path.join(remoteDir, filename);
      if (!fs.existsSync(dest)) {
        console.log('Downloading', url);
        try {
          await download(url, dest);
          console.log('Saved as', path.join('assets/images/remote', filename));
        } catch (err) {
          console.warn('Failed to download', url, err.message);
          continue;
        }
      } else {
        console.log('Already downloaded', url);
      }

      // Replace occurrences in dist files with absolute path to the downloaded image
      const replacePath = `/assets/images/remote/${filename}`;
      distFiles.forEach(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          if (content.indexOf(url) !== -1) {
            const newContent = content.split(url).join(replacePath);
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Rewrote ${path.relative(distDir, file)} -> ${replacePath}`);
          }
          // also rewrite protocol-less occurrences (//example.com/...)
          const protocolLess = url.replace(/^https?:/, '');
          if (content.indexOf(protocolLess) !== -1) {
            const newContent2 = fs.readFileSync(file, 'utf8').split(protocolLess).join(replacePath);
            fs.writeFileSync(file, newContent2, 'utf8');
            console.log(`Rewrote ${path.relative(distDir, file)} -> ${replacePath} (protocol-less)`);
          }
        } catch (err) {
          // ignore
        }
      });

    } catch (err) {
      console.error('Failed processing', url, err.message);
    }
  }

  console.log('Remote image fetching complete.');
}

main().catch(err => {
  console.error('Error in fetch-remote-images:', err);
  process.exit(1);
});
