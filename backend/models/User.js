import mongoose from 'mongoose';

// Create User Schema
const userSchema = new mongoose.Schema({
  // User Authentication Info
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    // Storing profile picture as binary data directly in MongoDB
    data: Buffer,
    contentType: String,
  },
  // User Role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // Skill Listings (referencing Skill schema)
  skillsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
  skillsWanted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
  // Matched Users (reference to users this user has been matched with)
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // Direct Messaging
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  // Reviews and Ratings (received)
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  // Webinars organized and registered for
  webinarsOrganized: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webinar',
  }],
  webinarsRegistered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webinar',
  }],
  // Resources uploaded
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
  }],
  // Account Information
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update 'updatedAt' on user modification
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
const User = mongoose.model('User', userSchema);
export default User;
