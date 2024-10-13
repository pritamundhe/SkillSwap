// Import dependencies
import mongoose from 'mongoose';

// Create Resource Schema
const resourceSchema = new mongoose.Schema({
  // Resource File Info
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: String, // Mime type (e.g., 'application/pdf', 'image/png')
  },
  skill:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        // Linking the resource to the user who uploaded it
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  // Access level for the resource
  accessLevel: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
});

// Export the Resource model
const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;