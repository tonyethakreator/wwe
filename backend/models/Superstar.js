const mongoose = require('mongoose');

const SuperstarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    trim: true
  },
  realName: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    enum: ['Raw', 'SmackDown', 'NXT', 'Legend', 'Free Agent'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  height: {
    type: String,
    trim: true
  },
  weight: {
    type: String,
    trim: true
  },
  hometown: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  debutDate: {
    type: Date
  },
  bio: {
    type: String
  },
  alignment: {
    type: String,
    enum: ['Face', 'Heel', 'Tweener'],
    default: 'Face'
  },
  finishers: [{
    type: String,
    trim: true
  }],
  themeSong: {
    type: String,
    trim: true
  },
  socialMedia: {
    twitter: String,
    instagram: String,
    facebook: String,
    youtube: String
  },
  championships: [{
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Championship'
    },
    reigns: Number,
    currentChampion: Boolean,
    reignStartDate: Date,
    reignDays: Number
  }],
  accomplishments: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isInjured: {
    type: Boolean,
    default: false
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
SuperstarSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a text index for search functionality
SuperstarSchema.index({ 
  name: 'text', 
  nickname: 'text', 
  realName: 'text',
  hometown: 'text',
  bio: 'text'
});

module.exports = mongoose.model('Superstar', SuperstarSchema);