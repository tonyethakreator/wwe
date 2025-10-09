# WWE Access Organization - Superstar Profiles Guide

This guide explains how to add and maintain superstar profiles on the WWE Access Organization website.

## Current Superstar Profiles

We have created detailed profiles for the following WWE superstars:

1. **Cody Rhodes** - WWE Champion, SmackDown
2. **Seth Rollins** - World Heavyweight Champion, Raw
3. **Becky Lynch** - Women's Intercontinental Champion, Raw
4. **Roman Reigns** - Former Undisputed WWE Universal Champion, SmackDown
5. **John Cena** - 16-time World Champion, Free Agent
6. **Brock Lesnar** - Former WWE Champion, Free Agent

Each profile includes:
- Personal information (real name, birthdate, height, weight, etc.)
- Biography and career history
- Championship history
- Accomplishments
- Career highlights timeline
- Related superstars

## How to Add More Superstar Profiles

### Method 1: Using the Automated Tool

We've created a tool to help you quickly generate new superstar profile pages:

```bash
npm run create-profile "Superstar Name" "Nickname" "Brand"
```

For example:
```bash
npm run create-profile "Randy Orton" "The Viper" "SmackDown"
```

This will create a new file at `src/pages/randy-orton.html` with placeholder information that you can then edit.

### Method 2: Manual Creation

1. Copy one of the existing superstar profile HTML files (e.g., `src/pages/cody-rhodes.html`)
2. Rename it to match the new superstar's name (e.g., `randy-orton.html`)
3. Update all the information in the file to match the new superstar
4. Add the superstar's image to `src/assets/images/superstars/`
5. Update links in other pages to point to this new profile

### Required Information for Each Profile

For each superstar profile, you should include:

- **Personal Information**
  - Real name
  - Birthdate and age
  - Birthplace
  - Height and weight
  - Debut date
  - Finisher moves
  - Theme song
  - Current alignment (Face/Heel/Tweener)

- **Biography**
  - Early life and background
  - How they got into wrestling
  - Major career milestones
  - Current status

- **Championship History**
  - World championships
  - Other championships
  - Dates and events where titles were won

- **Accomplishments**
  - Tournament wins
  - Awards and accolades
  - Records held

- **Career Highlights**
  - Timeline of major events
  - Significant matches
  - Character changes
  - Memorable moments

## Adding the Superstar to Navigation

After creating a new superstar profile, make sure to:

1. Add them to the appropriate section in `src/pages/superstars.html`
2. Update any related superstar sections in other profiles
3. Consider adding them to the featured superstars on the homepage if they're a top star

## Image Guidelines

For superstar images:

1. Use square images (1:1 aspect ratio)
2. Focus on the face and upper body
3. Use high-resolution images (at least 300x300 pixels)
4. Name the file after the superstar with lowercase letters and hyphens (e.g., `randy-orton.jpg`)
5. Place the image in `src/assets/images/superstars/`

You can use the placeholder generator tool to create temporary images:

```bash
node src/tools/generate-placeholder-images.js
```

## Keeping Information Up-to-Date

WWE storylines and championships change frequently. To keep the website current:

1. Update championship information when title changes occur
2. Update superstar profiles with new accomplishments and storylines
3. Update brand affiliations when superstars move between Raw, SmackDown, and NXT
4. Update images when superstars change their appearance significantly

Use the championship update tool to quickly update championship information:

```bash
npm run update-champion "Championship Name" "New Champion Name" "Event Name" "Date"
```

## Testing Links

After adding new profiles or updating existing ones, always test:

1. Navigation links to ensure they point to the correct pages
2. Related superstar links to ensure they work properly
3. Championship links to ensure they point to the correct championship pages