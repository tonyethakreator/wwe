const Superstar = require('../models/Superstar');
const Championship = require('../models/Championship');

// Get all superstars
exports.getAllSuperstars = async (req, res) => {
  try {
    const superstars = await Superstar.find()
      .select('name nickname brand gender imageUrl thumbnailUrl isActive isInjured')
      .sort({ brand: 1, name: 1 });
    
    res.json(superstars);
  } catch (err) {
    console.error('Error fetching superstars:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get superstar by ID
exports.getSuperstarById = async (req, res) => {
  try {
    const superstar = await Superstar.findById(req.params.id)
      .populate('championships.title', 'name imageUrl thumbnailUrl');
    
    if (!superstar) {
      return res.status(404).json({ message: 'Superstar not found' });
    }
    
    res.json(superstar);
  } catch (err) {
    console.error('Error fetching superstar:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get superstars by brand
exports.getSuperstarsByBrand = async (req, res) => {
  try {
    const superstars = await Superstar.find({ brand: req.params.brand })
      .select('name nickname brand gender imageUrl thumbnailUrl isActive isInjured')
      .sort({ name: 1 });
    
    res.json(superstars);
  } catch (err) {
    console.error('Error fetching superstars by brand:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get superstars by gender
exports.getSuperstarsByGender = async (req, res) => {
  try {
    const superstars = await Superstar.find({ gender: req.params.gender })
      .select('name nickname brand gender imageUrl thumbnailUrl isActive isInjured')
      .sort({ brand: 1, name: 1 });
    
    res.json(superstars);
  } catch (err) {
    console.error('Error fetching superstars by gender:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current champions
exports.getCurrentChampions = async (req, res) => {
  try {
    // Find all championships
    const championships = await Championship.find()
      .populate('currentChampion.superstar', 'name nickname brand gender imageUrl')
      .populate('currentChampion.team', 'name nickname brand gender imageUrl');
    
    // Extract current champions
    const champions = championships.map(championship => {
      return {
        championship: {
          id: championship._id,
          name: championship.name,
          type: championship.type,
          brand: championship.brand,
          imageUrl: championship.thumbnailUrl
        },
        isTeam: championship.currentChampion.isTeam,
        superstar: championship.currentChampion.superstar,
        team: championship.currentChampion.team,
        reignNumber: championship.currentChampion.reignNumber,
        wonDate: championship.currentChampion.wonDate,
        wonEvent: championship.currentChampion.wonEvent,
        reignDays: championship.currentChampion.reignDays
      };
    });
    
    res.json(champions);
  } catch (err) {
    console.error('Error fetching current champions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get superstar championships history
exports.getSuperstarChampionships = async (req, res) => {
  try {
    const superstar = await Superstar.findById(req.params.id)
      .select('championships')
      .populate('championships.title', 'name imageUrl thumbnailUrl type brand');
    
    if (!superstar) {
      return res.status(404).json({ message: 'Superstar not found' });
    }
    
    // Also find championships where this superstar appears in previousChampions
    const championships = await Championship.find({
      $or: [
        { 'previousChampions.superstar': req.params.id },
        { 'previousChampions.team': req.params.id }
      ]
    }).select('name type brand previousChampions');
    
    // Extract championship history
    const history = championships.map(championship => {
      const reigns = championship.previousChampions.filter(reign => {
        if (reign.isTeam) {
          return reign.team.some(member => member.toString() === req.params.id);
        } else {
          return reign.superstar && reign.superstar.toString() === req.params.id;
        }
      });
      
      return {
        championship: {
          id: championship._id,
          name: championship.name,
          type: championship.type,
          brand: championship.brand
        },
        reigns: reigns
      };
    }).filter(item => item.reigns.length > 0);
    
    // Combine current and previous championship data
    const result = {
      current: superstar.championships.filter(c => c.currentChampion),
      history: history
    };
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching superstar championships:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get related superstars (same brand, tag partners, rivals)
exports.getRelatedSuperstars = async (req, res) => {
  try {
    const superstar = await Superstar.findById(req.params.id);
    
    if (!superstar) {
      return res.status(404).json({ message: 'Superstar not found' });
    }
    
    // Find superstars from the same brand
    const sameBrand = await Superstar.find({ 
      _id: { $ne: req.params.id },
      brand: superstar.brand 
    })
    .select('name nickname brand gender imageUrl thumbnailUrl')
    .limit(6);
    
    // TODO: In a real implementation, we would also find tag partners and rivals
    // based on a relationship model or match history
    
    const related = {
      sameBrand: sameBrand,
      tagPartners: [], // Placeholder for tag partners
      rivals: [] // Placeholder for rivals
    };
    
    res.json(related);
  } catch (err) {
    console.error('Error fetching related superstars:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new superstar (admin only)
exports.createSuperstar = async (req, res) => {
  try {
    const newSuperstar = new Superstar(req.body);
    const superstar = await newSuperstar.save();
    
    res.status(201).json(superstar);
  } catch (err) {
    console.error('Error creating superstar:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update superstar details (admin only)
exports.updateSuperstar = async (req, res) => {
  try {
    const superstar = await Superstar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!superstar) {
      return res.status(404).json({ message: 'Superstar not found' });
    }
    
    res.json(superstar);
  } catch (err) {
    console.error('Error updating superstar:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a superstar (admin only)
exports.deleteSuperstar = async (req, res) => {
  try {
    const superstar = await Superstar.findByIdAndDelete(req.params.id);
    
    if (!superstar) {
      return res.status(404).json({ message: 'Superstar not found' });
    }
    
    res.json({ message: 'Superstar deleted successfully' });
  } catch (err) {
    console.error('Error deleting superstar:', err);
    res.status(500).json({ message: 'Server error' });
  }
};