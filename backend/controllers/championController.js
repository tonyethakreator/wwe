const Championship = require('../models/Championship');
const Superstar = require('../models/Superstar');

// Get all championships
exports.getAllChampionships = async (req, res) => {
  try {
    const championships = await Championship.find()
      .populate('currentChampion.superstar', 'name imageUrl brand')
      .populate('currentChampion.team', 'name imageUrl brand')
      .sort({ type: 1, brand: 1 });
    
    res.json(championships);
  } catch (err) {
    console.error('Error fetching championships:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get championship by ID
exports.getChampionshipById = async (req, res) => {
  try {
    const championship = await Championship.findById(req.params.id)
      .populate('currentChampion.superstar', 'name imageUrl brand nickname')
      .populate('currentChampion.team', 'name imageUrl brand nickname')
      .populate('previousChampions.superstar', 'name imageUrl')
      .populate('previousChampions.team', 'name imageUrl');
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    res.json(championship);
  } catch (err) {
    console.error('Error fetching championship:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get championships by type
exports.getChampionshipsByType = async (req, res) => {
  try {
    const championships = await Championship.find({ type: req.params.type })
      .populate('currentChampion.superstar', 'name imageUrl brand')
      .populate('currentChampion.team', 'name imageUrl brand')
      .sort({ brand: 1 });
    
    res.json(championships);
  } catch (err) {
    console.error('Error fetching championships by type:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get championships by brand
exports.getChampionshipsByBrand = async (req, res) => {
  try {
    const championships = await Championship.find({ brand: req.params.brand })
      .populate('currentChampion.superstar', 'name imageUrl')
      .populate('currentChampion.team', 'name imageUrl')
      .sort({ type: 1 });
    
    res.json(championships);
  } catch (err) {
    console.error('Error fetching championships by brand:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current champion for a specific championship
exports.getCurrentChampion = async (req, res) => {
  try {
    const championship = await Championship.findById(req.params.id)
      .select('currentChampion')
      .populate('currentChampion.superstar', 'name imageUrl brand nickname bio')
      .populate('currentChampion.team', 'name imageUrl brand nickname bio');
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    res.json(championship.currentChampion);
  } catch (err) {
    console.error('Error fetching current champion:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get championship history
exports.getChampionshipHistory = async (req, res) => {
  try {
    const championship = await Championship.findById(req.params.id)
      .select('previousChampions currentChampion')
      .populate('previousChampions.superstar', 'name imageUrl')
      .populate('previousChampions.team', 'name imageUrl')
      .populate('currentChampion.superstar', 'name imageUrl')
      .populate('currentChampion.team', 'name imageUrl');
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    // Combine current champion with previous champions for a complete history
    const history = {
      current: championship.currentChampion,
      previous: championship.previousChampions
    };
    
    res.json(history);
  } catch (err) {
    console.error('Error fetching championship history:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new championship (admin only)
exports.createChampionship = async (req, res) => {
  try {
    const newChampionship = new Championship(req.body);
    const championship = await newChampionship.save();
    
    res.status(201).json(championship);
  } catch (err) {
    console.error('Error creating championship:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update championship details (admin only)
exports.updateChampionship = async (req, res) => {
  try {
    const championship = await Championship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    res.json(championship);
  } catch (err) {
    console.error('Error updating championship:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update current champion (admin only)
exports.updateCurrentChampion = async (req, res) => {
  try {
    const championship = await Championship.findById(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    // If there's a current champion, move them to previous champions
    if (championship.currentChampion.superstar || 
        (championship.currentChampion.isTeam && championship.currentChampion.team.length > 0)) {
      
      const currentDate = new Date();
      const wonDate = championship.currentChampion.wonDate;
      const reignDays = Math.floor((currentDate - wonDate) / (1000 * 60 * 60 * 24));
      
      const previousChampion = {
        superstar: championship.currentChampion.superstar,
        team: championship.currentChampion.team,
        isTeam: championship.currentChampion.isTeam,
        reignNumber: championship.currentChampion.reignNumber,
        wonDate: championship.currentChampion.wonDate,
        wonEvent: championship.currentChampion.wonEvent,
        lostDate: currentDate,
        lostEvent: req.body.wonEvent,
        reignDays: reignDays
      };
      
      championship.previousChampions.unshift(previousChampion);
    }
    
    // Update with new champion
    championship.currentChampion = req.body;
    championship.currentChampion.wonDate = new Date();
    championship.currentChampion.reignDays = 0;
    
    await championship.save();
    
    res.json(championship);
  } catch (err) {
    console.error('Error updating current champion:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a championship (admin only)
exports.deleteChampionship = async (req, res) => {
  try {
    const championship = await Championship.findByIdAndDelete(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Championship not found' });
    }
    
    res.json({ message: 'Championship deleted successfully' });
  } catch (err) {
    console.error('Error deleting championship:', err);
    res.status(500).json({ message: 'Server error' });
  }
};