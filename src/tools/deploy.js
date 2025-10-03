/**
 * Script to deploy the website
 * Usage: node deploy.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Preparing to deploy WWE Access Organization website...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '../../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

// Copy all files from src to dist
try {
  console.log('Copying files from src to dist...');
  
  // Copy index.html - try common candidate locations (src/ and project root)
  const indexCandidates = [
    path.join(__dirname, '../index.html'), // index.html
    path.join(__dirname, '../../index.html') // project root index.html
  ];
  let indexSrc = null;
  for (const cand of indexCandidates) {
    if (fs.existsSync(cand)) {
      indexSrc = cand;
      break;
    }
  }
  if (!indexSrc) {
    throw new Error(`Could not find index.html in any of the expected locations: ${indexCandidates.join(', ')}`);
  }
  fs.copyFileSync(indexSrc, path.join(distDir, 'index.html'));
  console.log(`Copied index.html from ${indexSrc}`);
  
  // Copy pages directory
  const pagesDir = path.join(distDir, 'pages');
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }
  
  const srcPagesDir = path.join(__dirname, '../pages');
  const pageFiles = fs.readdirSync(srcPagesDir);
  pageFiles.forEach(file => {
    if (file.endsWith('.html')) {
      fs.copyFileSync(
        path.join(srcPagesDir, file),
        path.join(pagesDir, file)
      );
    }
  });
  console.log(`Copied ${pageFiles.length} page files`);
  
  // Copy assets directory
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Copy CSS
  const cssDir = path.join(assetsDir, 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  
  const srcCssDir = path.join(__dirname, '../assets/css');
  const cssFiles = fs.readdirSync(srcCssDir);
  cssFiles.forEach(file => {
    if (file.endsWith('.css')) {
      fs.copyFileSync(
        path.join(srcCssDir, file),
        path.join(cssDir, file)
      );
    }
  });
  console.log(`Copied ${cssFiles.length} CSS files`);
  
  // Copy JS
  const jsDir = path.join(assetsDir, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  
  const srcJsDir = path.join(__dirname, '../assets/js');
  const jsFiles = fs.readdirSync(srcJsDir);
  jsFiles.forEach(file => {
    if (file.endsWith('.js')) {
      fs.copyFileSync(
        path.join(srcJsDir, file),
        path.join(jsDir, file)
      );
    }
  });
  console.log(`Copied ${jsFiles.length} JS files`);
  
  // Copy images directory
  const imagesDir = path.join(assetsDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Copy logo and favicon
  const srcImagesDir = path.join(__dirname, '../assets/images');
  if (fs.existsSync(path.join(srcImagesDir, 'logo.svg'))) {
    fs.copyFileSync(
      path.join(srcImagesDir, 'logo.svg'),
      path.join(imagesDir, 'logo.svg')
    );
  }
  if (fs.existsSync(path.join(srcImagesDir, 'favicon.svg'))) {
    fs.copyFileSync(
      path.join(srcImagesDir, 'favicon.svg'),
      path.join(imagesDir, 'favicon.svg')
    );
  }
  
  // Create subdirectories for images
  const imageSubdirs = ['superstars', 'championships', 'backgrounds'];
  imageSubdirs.forEach(subdir => {
    const targetDir = path.join(imagesDir, subdir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const srcSubdir = path.join(srcImagesDir, subdir);
    if (fs.existsSync(srcSubdir)) {
      const files = fs.readdirSync(srcSubdir);
      files.forEach(file => {
        fs.copyFileSync(
          path.join(srcSubdir, file),
          path.join(targetDir, file)
        );
      });
      console.log(`Copied ${files.length} files from ${subdir}`);
    }
  });
  
  // Copy background images
  ['hero-bg.svg', 'championships-bg.svg', 'superstars-bg.svg'].forEach(file => {
    if (fs.existsSync(path.join(srcImagesDir, file))) {
      fs.copyFileSync(
        path.join(srcImagesDir, file),
        path.join(imagesDir, file)
      );
    }
  });
  
  console.log('All files copied successfully!');

  // Fetch remote images referenced in built files and rewrite references to local copies
  try {
    const fetchScript = path.join(__dirname, 'fetch-remote-images.js');
    if (fs.existsSync(fetchScript)) {
      console.log('Downloading remote images referenced in files...');
      execSync(`node "${fetchScript}" "${distDir}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.warn('Warning: fetch-remote-images failed:', err.message);
  }

  // Post-processing: replace references to missing raster images with SVG fallbacks
  // This prevents 404s when JPG/PNG images referenced in HTML/JS are not present in the repo.
  const walkDir = (dir, exts = []) => {
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
  };

  const filesToPatch = walkDir(distDir, ['.html', '.js', '.css']);
  filesToPatch.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // Replace favicon.png with favicon.svg when present
    newContent = newContent.replace(/assets\/images\/favicon\.(png|ico)/g, 'assets/images/favicon.svg');

    // Replace hero-bg.jpg/png with hero-bg.svg
    newContent = newContent.replace(/assets\/images\/hero-bg\.(jpg|png|jpeg)/g, 'assets/images/hero-bg.svg');

    // Replace references to images under superstars/ or champions/ (jpg/png) with logo.svg fallback
    newContent = newContent.replace(/assets\/images\/(?:superstars|champions)\/[^\)\"'\s]+\.(jpg|png|jpeg)/g, 'assets/images/logo.svg');

    // If content changed, write back
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Patched image references in ${path.relative(distDir, file)}`);
    }
  });

  console.log('Website is ready for deployment in the dist directory.');
  console.log('To deploy to production, use the deploy tool with:');
  console.log('  npm run deploy');
  
} catch (err) {
  console.error('Error during deployment preparation:', err);
  process.exit(1);
}