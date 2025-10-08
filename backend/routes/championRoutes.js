const express = require('express');
const router = express.Router();
const championController = require('../controllers/championController');

// Get all championships
router.get('/', championController.getAllChampionships);

// Get championship by ID
router.get('/:id', championController.getChampionshipById);

// Get championships by type (World, Women's, Midcard, Tag Team, etc.)
router.get('/type/:type', championController.getChampionshipsByType);

// Get championships by brand (Raw, SmackDown, NXT)
router.get('/brand/:brand', championController.getChampionshipsByBrand);

// Get current champion for a specific championship
router.get('/:id/champion', championController.getCurrentChampion);

// Get championship history
router.get('/:id/history', championController.getChampionshipHistory);

// Create a new championship (admin only)
router.post('/', championController.createChampionship);

// Update championship details (admin only)
router.put('/:id', championController.updateChampionship);

// Update current champion (admin only)
router.put('/:id/champion', championController.updateCurrentChampion);

// Delete a championship (admin only)
router.delete('/:id', championController.deleteChampionship);

module.exports = router;