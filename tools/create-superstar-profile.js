/**
 * Script to create a new superstar profile based on the template
 * Usage: node create-superstar-profile.js "Superstar Name" "nickname" "brand"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node create-superstar-profile.js "Superstar Name" "nickname" "brand"');
  process.exit(1);
}

const superstarName = args[0];
const nickname = args[1];
const brand = args[2];

// Create filename from superstar name
const filename = superstarName.toLowerCase().replace(/\s+/g, '-') + '.html';
const outputPath = path.join(__dirname, '../pages', filename);

// Check if file already exists
if (fs.existsSync(outputPath)) {
  console.error(`Error: File ${filename} already exists.`);
  process.exit(1);
}

// Read template file
const templatePath = path.join(__dirname, '../pages/superstar-template.html');
let template;

try {
  template = fs.readFileSync(templatePath, 'utf8');
} catch (err) {
  console.error('Error reading template file:', err);
  process.exit(1);
}

// Replace placeholders with actual values
const content = template
  .replace(/{{SUPERSTAR_NAME}}/g, superstarName)
  .replace(/{{SUPERSTAR_NICKNAME}}/g, nickname)
  .replace(/{{SUPERSTAR_BRAND}}/g, brand)
  .replace(/{{SUPERSTAR_IMAGE}}/g, filename.replace('.html', '.jpg'))
  .replace(/{{SUPERSTAR_HEIGHT}}/g, '6\'0"')
  .replace(/{{SUPERSTAR_WEIGHT}}/g, '220 lbs')
  .replace(/{{SUPERSTAR_HOMETOWN}}/g, 'Hometown')
  .replace(/{{SUPERSTAR_REAL_NAME}}/g, 'Real Name')
  .replace(/{{SUPERSTAR_BIRTHDATE}}/g, 'January 1, 1990 (35 years)')
  .replace(/{{SUPERSTAR_BIRTHPLACE}}/g, 'Birthplace')
  .replace(/{{SUPERSTAR_DEBUT}}/g, '2010')
  .replace(/{{SUPERSTAR_FINISHERS}}/g, 'Finisher Name')
  .replace(/{{SUPERSTAR_THEME}}/g, 'Theme Song')
  .replace(/{{SUPERSTAR_ALIGNMENT}}/g, 'Face')
  .replace(/{{SUPERSTAR_FAMILY_SECTION}}/g, '')
  .replace(/{{SUPERSTAR_TWITTER}}/g, '#')
  .replace(/{{SUPERSTAR_INSTAGRAM}}/g, '#')
  .replace(/{{SUPERSTAR_FACEBOOK}}/g, '#')
  .replace(/{{SUPERSTAR_YOUTUBE}}/g, '#')
  .replace(/{{SUPERSTAR_BIO}}/g, '<p>Add biography here.</p>')
  .replace(/{{SUPERSTAR_CHAMPIONSHIPS}}/g, '<p>No championships yet.</p>')
  .replace(/{{SUPERSTAR_ACCOMPLISHMENTS}}/g, '<p>No major accomplishments yet.</p>')
  .replace(/{{SUPERSTAR_CAREER_HIGHLIGHTS}}/g, '<p>No career highlights yet.</p>')
  .replace(/{{RELATED_SUPERSTARS}}/g, '<!-- Add related superstars here -->');

// Write to file
try {
  fs.writeFileSync(outputPath, content);
  console.log(`Successfully created ${filename}`);
  
  // Create a reminder for the image
  console.log(`Don't forget to add the superstar's image at: assets/images/superstars/${filename.replace('.html', '.jpg')}`);
} catch (err) {
  console.error('Error writing file:', err);
  process.exit(1);
}