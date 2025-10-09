# WWE Access Organization Website - Administrator Guide

This guide provides instructions for website administrators on how to maintain and update the WWE Access Organization website.

## Table of Contents
1. [Adding New Superstar Profiles](#adding-new-superstar-profiles)
2. [Updating Championship Information](#updating-championship-information)
3. [Deploying the Website](#deploying-the-website)
4. [Maintaining the Backend](#maintaining-the-backend)

## Adding New Superstar Profiles

### Using the Automated Tool
We've created a tool to help you quickly generate new superstar profile pages:

```bash
npm run create-profile "Superstar Name" "Nickname" "Brand"
```

For example:
```bash
npm run create-profile "Roman Reigns" "The Tribal Chief" "SmackDown"
```

This will create a new file at `src/pages/roman-reigns.html` with placeholder information that you can then edit.

### Manual Creation
If you prefer to create profiles manually:

1. Copy the template from `src/pages/superstar-template.html`
2. Create a new file in the `src/pages/` directory named after the superstar (e.g., `roman-reigns.html`)
3. Replace all placeholder values (marked with {{PLACEHOLDER}}) with the superstar's actual information
4. Add the superstar's image to `src/assets/images/superstars/`
5. Update any links in other pages that should point to this superstar's profile

### Required Information for Superstar Profiles
- Full name
- Nickname/moniker
- Height and weight
- Hometown
- Current brand (Raw, SmackDown, NXT)
- Real name
- Birth date and place
- Debut date
- Finisher moves
- Theme song
- Current alignment (Face/Heel/Tweener)
- Family information (if applicable)
- Social media links
- Biography
- Championship history
- Accomplishments
- Career highlights

## Updating Championship Information

### Using the Automated Tool
We've created a tool to help you quickly update championship information:

```bash
npm run update-champion "Championship Name" "New Champion Name" "Event Name" "Date"
```

For example:
```bash
npm run update-champion "WWE Championship" "Roman Reigns" "Survivor Series" "November 21, 2025"
```

### Manual Updates
To update championship information manually:

1. Open `src/pages/championships.html`
2. Find the section for the championship you want to update
3. Update the champion information, including:
   - Champion name
   - Image path
   - Reign number
   - Reign duration
   - Date and event where the title was won
4. If this is a featured championship on the homepage, also update `src/index.html`

## Deploying the Website

### Using the Automated Tool
We've created a deployment script that prepares all files for production:

```bash
npm run build
```

This will create a `dist` directory with all the necessary files for deployment.

### Manual Deployment
If you need to manually deploy:

1. Copy all files from the `src` directory to your web server
2. Ensure all file permissions are set correctly
3. Test all links and functionality after deployment

## Maintaining the Backend

### Database Management
The website uses MongoDB for data storage. To manage the database:

1. Connect to the MongoDB instance using the connection string in your environment variables
2. Use the MongoDB shell or a GUI tool like MongoDB Compass to manage data
3. The main collections are:
   - `superstars` - Contains all superstar information
   - `championships` - Contains all championship information

### API Endpoints
The backend provides several API endpoints:

- `/api/champions` - Get all championships
- `/api/champions/:id` - Get championship by ID
- `/api/superstars` - Get all superstars
- `/api/superstars/:id` - Get superstar by ID
- `/api/search` - Search across all content

### Environment Variables
Make sure these environment variables are set in production:

- `PORT` - The port the server will run on (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Set to 'production' in production environment

## Support and Troubleshooting

If you encounter any issues or need assistance, please contact the development team at:
- Email: dev@wweaccessorg.com
- Internal Ticket System: [support.wweaccessorg.com](https://support.wweaccessorg.com)