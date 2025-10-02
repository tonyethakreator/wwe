/**
 * Script to generate placeholder images for superstars
 * This script creates HTML files that can be opened in a browser to save as images
 */

const fs = require('fs');
const path = require('path');

// List of superstars to create placeholder images for
const superstars = [
  { name: "Roman Reigns", color: "#0057b8", textColor: "#ffffff" },
  { name: "John Cena", color: "#1a5c1a", textColor: "#ffffff" },
  { name: "Brock Lesnar", color: "#8b0000", textColor: "#ffffff" },
  { name: "Seth Rollins", color: "#444444", textColor: "#ffffff" },
  { name: "Cody Rhodes", color: "#d7182a", textColor: "#ffffff" },
  { name: "Becky Lynch", color: "#ff6b00", textColor: "#ffffff" },
  { name: "Dominik Mysterio", color: "#800080", textColor: "#ffffff" },
  { name: "Giulia", color: "#ff69b4", textColor: "#ffffff" },
  { name: "Tiffany Stratton", color: "#ff00ff", textColor: "#ffffff" },
  { name: "Stephanie Vaquer", color: "#4b0082", textColor: "#ffffff" },
  { name: "Sami Zayn", color: "#008000", textColor: "#ffffff" },
  { name: "Gunther", color: "#000080", textColor: "#ffffff" },
  { name: "Rhea Ripley", color: "#800000", textColor: "#ffffff" },
  { name: "Jey Uso", color: "#ff0000", textColor: "#ffffff" },
  { name: "Jimmy Uso", color: "#ff4500", textColor: "#ffffff" },
  { name: "Solo Sikoa", color: "#808000", textColor: "#ffffff" },
  { name: "Jacob Fatu", color: "#8b4513", textColor: "#ffffff" },
  { name: "Randy Orton", color: "#008080", textColor: "#ffffff" },
  { name: "AJ Styles", color: "#0000ff", textColor: "#ffffff" },
  { name: "Bobby Lashley", color: "#000000", textColor: "#ffffff" }
];

// Create output directory
const outputDir = path.join(__dirname, '../assets/images/placeholders');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate HTML for each superstar
superstars.forEach(superstar => {
  const fileName = superstar.name.toLowerCase().replace(/\s+/g, '-');
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${superstar.name} Placeholder</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: white;
        }
        .placeholder {
            width: 300px;
            height: 300px;
            background-color: ${superstar.color};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: ${superstar.textColor};
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .wwe {
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="placeholder">
        <div class="name">${superstar.name}</div>
        <div class="wwe">WWE Superstar</div>
    </div>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(outputDir, `${fileName}.html`), htmlContent);
  console.log(`Created placeholder HTML for ${superstar.name}`);
});

console.log(`
Placeholder HTML files have been created in ${outputDir}
To create images:
1. Open each HTML file in a browser
2. Take a screenshot or use browser tools to save as image
3. Save the image as a JPG file with the same name in the superstars directory
`);