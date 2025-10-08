const express = require('express');
const router = express.Router();
const superstarController = require('../controllers/superstarController');

// Get all superstars
router.get('/', superstarController.getAllSuperstars);

// Get superstar by ID
router.get('/:id', superstarController.getSuperstarById);

// Get superstars by brand (Raw, SmackDown, NXT)
router.get('/brand/:brand', superstarController.getSuperstarsByBrand);

// Get superstars by gender
router.get('/gender/:gender', superstarController.getSuperstarsByGender);

// Get current champions
router.get('/champions/current', superstarController.getCurrentChampions);

// Get superstar championships history
router.get('/:id/championships', superstarController.getSuperstarChampionships);

// Get related superstars (same brand, tag partners, rivals)
router.get('/:id/related', superstarController.getRelatedSuperstars);

// Create a new superstar (admin only)
router.post('/', superstarController.createSuperstar);

// Update superstar details (admin only)
router.put('/:id', superstarController.updateSuperstar);

// Delete a superstar (admin only)
router.delete('/:id', superstarController.deleteSuperstar);

module.exports = router;