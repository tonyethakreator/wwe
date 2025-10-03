#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const crypto = require('crypto');

function walkDir(dir, exts = []) {
  let results = [];
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
        // handle redirects
        return resolve(download(res.headers.location, dest));
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
  });
}

async function main() {
  const distDirArg = process.argv[2];
  const distDir = distDirArg ? path.resolve(distDirArg) : path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    console.log('No dist directory found at', distDir);
    return;
  }

  const files = walkDir(distDir, ['.html', '.js', '.css']);
  const urlRegex = new RegExp('(https?:\\/\\/[^"\'\\)\\s>]+?\\.(?:png|jpe?g|svg|webp))', 'gi');

  const found = new Map();
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = urlRegex.exec(content)) !== null) {
      const url = m[1];
      found.set(url, true);
    }
  });

  if (found.size === 0) {
    console.log('No remote images found to download.');
    return;
  }

  const remoteDir = path.join(distDir, 'assets', 'images', 'remote');
  if (!fs.existsSync(remoteDir)) fs.mkdirSync(remoteDir, { recursive: true });

  console.log(`Found ${found.size} remote image(s). Downloading to ${path.relative(process.cwd(), remoteDir)}...`);

  for (const url of found.keys()) {
    try {
      const extMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
      const hash = crypto.createHash('md5').update(url).digest('hex');
      const filename = `${hash}.${ext}`;
      const dest = path.join(remoteDir, filename);
      if (!fs.existsSync(dest)) {
        console.log('Downloading', url);
        await download(url, dest);
        console.log('Saved as', path.join('assets/images/remote', filename));
      } else {
        console.log('Already downloaded', url);
      }

      // Replace occurrences in files with absolute path to the downloaded image
      const replacePath = `/assets/images/remote/${filename}`;
      files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (content.indexOf(url) !== -1) {
          const newContent = content.split(url).join(replacePath);
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Rewrote ${path.relative(distDir, file)} -> ${replacePath}`);
        }
      });

    } catch (err) {
      console.error('Failed to download', url, err.message);
    }
  }

  console.log('Remote image fetching complete.');
}

main().catch(err => {
  console.error('Error in fetch-remote-images:', err);
  process.exit(1);
});
