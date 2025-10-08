const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search across all content (superstars, championships)
router.get('/', searchController.searchAll);

// Search superstars
router.get('/superstars', searchController.searchSuperstars);

// Search championships
router.get('/championships', searchController.searchChampionships);

// Advanced search with filters
router.post('/advanced', searchController.advancedSearch);

module.exports = router;