# WWE Access Organization

## Overview
WWE Access Organization is a comprehensive web platform providing detailed information about WWE championships and superstar profiles. This project aims to create an updated version of the WWE Access Organization website with current championship information as of September 2025, including searchable superstar profiles and a modern design.

## Features
- **Championship Showcase**: Detailed information about all current WWE championships across Raw, SmackDown, and NXT brands
- **Superstar Profiles**: Comprehensive profiles of WWE superstars with biographical information, career highlights, and championship history
- **Search Functionality**: Advanced search capabilities to find superstars and championships
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **Backend API**: RESTful API for data retrieval and management

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Additional Tools**: Font Awesome for icons, Google Fonts for typography

## Project Structure
```
wwe-access-organization/
├── src/                  # Frontend source files
│   ├── assets/           # Static assets (images, CSS, JS)
│   │   ├── css/          # Stylesheet files
│   │   ├── js/           # JavaScript files
│   │   └── images/       # Image files
│   ├── pages/            # HTML pages
│   ├── components/       # Reusable HTML components
│   └── index.html        # Main entry point
├── backend/              # Backend source files
│   ├── config/           # Configuration files
│   ├── controllers/      # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Installation and Setup
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/wwe-access-organization.git
   cd wwe-access-organization
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

### Championships
- `GET /api/champions` - Get all championships
- `GET /api/champions/:id` - Get championship by ID
- `GET /api/champions/type/:type` - Get championships by type
- `GET /api/champions/brand/:brand` - Get championships by brand
- `GET /api/champions/:id/champion` - Get current champion for a specific championship
- `GET /api/champions/:id/history` - Get championship history

### Superstars
- `GET /api/superstars` - Get all superstars
- `GET /api/superstars/:id` - Get superstar by ID
- `GET /api/superstars/brand/:brand` - Get superstars by brand
- `GET /api/superstars/gender/:gender` - Get superstars by gender
- `GET /api/superstars/champions/current` - Get current champions
- `GET /api/superstars/:id/championships` - Get superstar championships history
- `GET /api/superstars/:id/related` - Get related superstars

### Search
- `GET /api/search?q=query` - Search across all content
- `GET /api/search/superstars?q=query` - Search superstars
- `GET /api/search/championships?q=query` - Search championships
- `POST /api/search/advanced` - Advanced search with filters

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer
This is a fan site and is not affiliated with WWE. WWE is a registered trademark of World Wrestling Entertainment, Inc.