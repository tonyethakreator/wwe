# WWE Access Organization - Images Directory

This directory contains all the images used in the WWE Access Organization website.

## Directory Structure

- `superstars/` - Contains images of WWE superstars
- `championships/` - Contains images of WWE championships
- `logo.svg` - The website logo
- `favicon.svg` - The website favicon
- `hero-bg.svg` - Background for the hero section
- `championships-bg.svg` - Background for the championships page
- `superstars-bg.svg` - Background for the superstars page

## Adding Superstar Images

When adding a new superstar profile, you need to add their image to the `superstars/` directory. The image should:

1. Be named after the superstar with lowercase letters and hyphens (e.g., `roman-reigns.jpg`, `john-cena.jpg`)
2. Have a 1:1 aspect ratio (square) for consistency
3. Be cropped to focus on the superstar's face and upper body
4. Have a resolution of at least 300x300 pixels (600x600 recommended)
5. Be in JPG or PNG format

You can use the placeholder generator tool to create temporary images:

```bash
node tools/generate-placeholder-images.js
```

## Adding Championship Images

When adding championship images, you need two versions:

1. A small icon version for the championship cards (e.g., `wwe-championship.png`)
2. A full-size version for the championship detail pages (e.g., `wwe-championship-full.jpg`)

The icon version should:
- Be transparent PNG
- Be approximately 64x36 pixels
- Show just the championship belt face

The full-size version should:
- Be high resolution (at least 800x600)
- Show the entire championship belt
- Be in JPG format for better compression

## Background Images

The background images are SVG files that provide the visual styling for the different sections of the website. If you need to modify them:

1. Edit the SVG files directly in a text editor or SVG editor
2. Keep the same dimensions and general style for consistency
3. Test the changes in different screen sizes to ensure responsiveness