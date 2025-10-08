const Superstar = require('../models/Superstar');
const Championship = require('../models/Championship');

// Search across all content (superstars, championships)
exports.searchAll = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search superstars
    const superstars = await Superstar.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .select('name nickname brand gender imageUrl thumbnailUrl')
    .sort({ score: { $meta: "textScore" } })
    .limit(10);
    
    // Search championships
    const championships = await Championship.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .select('name type brand imageUrl thumbnailUrl')
    .sort({ score: { $meta: "textScore" } })
    .limit(5);
    
    // Combine results
    const results = {
      superstars: superstars,
      championships: championships
    };
    
    res.json(results);
  } catch (err) {
    console.error('Error searching content:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search superstars
exports.searchSuperstars = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search superstars
    const superstars = await Superstar.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .select('name nickname brand gender imageUrl thumbnailUrl')
    .sort({ score: { $meta: "textScore" } })
    .limit(20);
    
    res.json(superstars);
  } catch (err) {
    console.error('Error searching superstars:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search championships
exports.searchChampionships = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search championships
    const championships = await Championship.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .select('name type brand imageUrl thumbnailUrl')
    .sort({ score: { $meta: "textScore" } })
    .limit(10);
    
    res.json(championships);
  } catch (err) {
    console.error('Error searching championships:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Advanced search with filters
exports.advancedSearch = async (req, res) => {
  try {
    const { query, filters } = req.body;
    
    if (!query && !filters) {
      return res.status(400).json({ message: 'Search query or filters are required' });
    }
    
    let searchQuery = {};
    
    // Add text search if query is provided
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    // Add filters if provided
    if (filters) {
      // Brand filter
      if (filters.brand) {
        searchQuery.brand = filters.brand;
      }
      
      // Gender filter
      if (filters.gender) {
        searchQuery.gender = filters.gender;
      }
      
      // Championship filter (current champions only)
      if (filters.isChampion) {
        searchQuery['championships.currentChampion'] = true;
      }
      
      // Active/inactive filter
      if (filters.isActive !== undefined) {
        searchQuery.isActive = filters.isActive;
      }
      
      // Injured filter
      if (filters.isInjured !== undefined) {
        searchQuery.isInjured = filters.isInjured;
      }
    }
    
    // Execute search
    const superstars = await Superstar.find(searchQuery)
      .select('name nickname brand gender imageUrl thumbnailUrl isActive isInjured')
      .sort(query ? { score: { $meta: "textScore" } } : { name: 1 })
      .limit(50);
    
    res.json(superstars);
  } catch (err) {
    console.error('Error performing advanced search:', err);
    res.status(500).json({ message: 'Server error' });
  }
};