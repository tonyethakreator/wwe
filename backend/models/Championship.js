const mongoose = require('mongoose');

const ChampionshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['World', 'Women\'s World', 'Midcard', 'Women\'s Midcard', 'Tag Team', 'Women\'s Tag Team', 'Developmental'],
    required: true
  },
  brand: {
    type: String,
    enum: ['Raw', 'SmackDown', 'NXT', 'Cross-Brand'],
    required: true
  },
  establishedDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  currentChampion: {
    superstar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Superstar'
    },
    team: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Superstar'
    }],
    isTeam: {
      type: Boolean,
      default: false
    },
    reignNumber: {
      type: Number,
      default: 1
    },
    wonDate: {
      type: Date
    },
    wonEvent: {
      type: String,
      trim: true
    },
    reignDays: {
      type: Number,
      default: 0
    }
  },
  previousChampions: [{
    superstar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Superstar'
    },
    team: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Superstar'
    }],
    isTeam: {
      type: Boolean,
      default: false
    },
    reignNumber: Number,
    wonDate: Date,
    wonEvent: String,
    lostDate: Date,
    lostEvent: String,
    reignDays: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ChampionshipSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a text index for search functionality
ChampionshipSchema.index({ 
  name: 'text', 
  description: 'text'
});

module.exports = mongoose.model('Championship', ChampionshipSchema);