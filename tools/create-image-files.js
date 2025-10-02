/**
 * Script to create actual image files for superstars
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// List of superstars that need images
const superstars = [
  { name: "Jimmy Uso", color: "#ff4500", textColor: "#ffffff" },
  { name: "Jey Uso", color: "#ff0000", textColor: "#ffffff" },
  { name: "Solo Sikoa", color: "#808000", textColor: "#ffffff" },
  { name: "Jacob Fatu", color: "#8b4513", textColor: "#ffffff" }
];

// Create the directory if it doesn't exist
const imagesDir = path.join(__dirname, '../assets/images/superstars');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create an image
function createImage(superstar) {
  const width = 300;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = superstar.color;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = superstar.textColor;
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(superstar.name, width / 2, height / 2 - 10);
  
  ctx.font = '18px Arial';
  ctx.fillText('WWE Superstar', width / 2, height / 2 + 20);

  // Save to file
  const fileName = superstar.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';
  const outputPath = path.join(imagesDir, fileName);
  
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created image for ${superstar.name} at ${outputPath}`);
}

// Create images for each superstar
superstars.forEach(superstar => {
  try {
    createImage(superstar);
  } catch (err) {
    console.error(`Error creating image for ${superstar.name}: ${err.message}`);
    
    // Create a simple placeholder file to ensure the file exists
    const fileName = superstar.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';
    const outputPath = path.join(imagesDir, fileName);
    
    // Create an empty file
    fs.writeFileSync(outputPath, '');
    console.log(`Created empty placeholder file for ${superstar.name} at ${outputPath}`);
  }
});

console.log('Image creation complete.');