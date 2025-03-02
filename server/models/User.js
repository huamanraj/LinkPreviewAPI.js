const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  apiKeys: [{
    key: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    requestCount: {
      type: Map,
      of: Number,
      default: {}
    }
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with the new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a new API key with a title
userSchema.methods.generateApiKey = function(title) {
  const apiKey = crypto.randomBytes(20).toString('hex');
  
  // Add the new key to the user's apiKeys array
  this.apiKeys.push({
    key: apiKey,
    title,
    createdAt: new Date(),
    isActive: true,
    requestCount: {}
  });
  
  return apiKey;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
