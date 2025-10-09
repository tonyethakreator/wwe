# WWE Access Organization Website

## Overview
This is the updated version of the WWE Access Organization website, featuring current WWE championship information as of September 2025 and detailed superstar profiles.

## Project Structure
- `assets/` - Contains all static assets (CSS, JavaScript, images)
- `pages/` - Contains HTML pages for different sections of the website
- `index.html` - Main homepage

## Adding New Superstar Profiles

To add a new superstar profile:

1. Create a new HTML file in the `pages/` directory named after the superstar (e.g., `roman-reigns.html`)
2. Use the `superstar-template.html` as a starting point
3. Replace all placeholder values (marked with {{PLACEHOLDER}}) with the superstar's actual information
4. Add the superstar's image to `assets/images/superstars/`
5. Update any links in other pages that should point to this superstar's profile

Example of creating a new superstar profile:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Superstar Name - WWE Access Organization</title>
    <!-- Rest of the head content -->
</head>
<body>
    <!-- Header -->
    <!-- ... -->

    <!-- Profile Container -->
    <div class="profile-container">
        <!-- Profile Header -->
        <section class="profile-header">
            <img src="../assets/images/superstars/superstar-image.jpg" alt="Superstar Name" class="profile-image">
            <h1 class="profile-name">Superstar Name</h1>
            <p class="profile-nickname">Superstar Nickname</p>
            <!-- ... -->
        </section>

        <!-- Profile Content -->
        <!-- ... -->
    </div>

    <!-- Footer -->
    <!-- ... -->
</body>
</html>
```

## Adding New Championship Information

To update championship information:

1. Edit the `championships.html` file in the `pages/` directory
2. Update the champion information, reign details, and history
3. Add any new championship images to `assets/images/championships/`

## Maintaining the Website

- Keep championship information up-to-date as title changes occur
- Add new superstar profiles as needed
- Update existing profiles with new accomplishments, championships, etc.
- Ensure all links between pages are working correctly

## Technical Details

- The website uses HTML5, CSS3, and JavaScript
- It's designed to be responsive and work on all devices
- The backend is built with Node.js, Express, and MongoDB
- API endpoints are available for data retrieval and management