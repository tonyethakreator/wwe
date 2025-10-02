/**
 * Script to update championship information
 * Usage: node update-champion.js "Championship Name" "New Champion Name" "Event Name" "Date"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: node update-champion.js "Championship Name" "New Champion Name" "Event Name" "Date"');
  process.exit(1);
}

const championshipName = args[0];
const newChampionName = args[1];
const eventName = args[2];
const date = args[3];

// Path to championships.html
const championshipsPath = path.join(__dirname, '../pages/championships.html');

// Read championships file
let championshipsContent;
try {
  championshipsContent = fs.readFileSync(championshipsPath, 'utf8');
} catch (err) {
  console.error('Error reading championships file:', err);
  process.exit(1);
}

// Find the championship section
const championshipRegex = new RegExp(`<h2 class="championship-name">${championshipName}</h2>[\\s\\S]*?<div class="championship-holder">([\\s\\S]*?)</div>`, 'i');
const match = championshipsContent.match(championshipRegex);

if (!match) {
  console.error(`Championship "${championshipName}" not found in the file.`);
  process.exit(1);
}

// Create the new champion HTML
const championImageFilename = newChampionName.toLowerCase().replace(/\s+/g, '-') + '.jpg';
const newChampionHTML = `
                    <div class="championship-holder">
                        <img src="../assets/images/superstars/${championImageFilename}" alt="${newChampionName}" class="holder-image">
                        <div class="holder-info">
                            <h3>${newChampionName}</h3>
                            <p class="reign-info">1+ days • 1st reign</p>
                            <p>Won at ${eventName} (${date})</p>
                        </div>
                    </div>`;

// Replace the old champion with the new one
const updatedContent = championshipsContent.replace(match[0], `<h2 class="championship-name">${championshipName}</h2>${newChampionHTML}`);

// Write the updated content back to the file
try {
  fs.writeFileSync(championshipsPath, updatedContent);
  console.log(`Successfully updated ${championshipName} champion to ${newChampionName}`);
  
  // Create a reminder for the image
  console.log(`Don't forget to ensure the champion's image exists at: assets/images/superstars/${championImageFilename}`);
  
  // Also update the homepage if this is a featured championship
  console.log('You may also need to update the homepage if this championship is featured there.');
} catch (err) {
  console.error('Error writing file:', err);
  process.exit(1);
}