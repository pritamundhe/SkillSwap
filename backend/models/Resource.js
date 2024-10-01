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
    data: Buffer,        // Storing file in MongoDB as binary data
    contentType: String, // Mime type (e.g., 'application/pdf', 'image/png')
  },
  // Resource linked to the webinar or profile
  linkedTo: {
    type: String,
    enum: ['webinar', 'profile'],
    required: true,
  },
  webinar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webinar',     // Linking resource to a webinar if applicable
    required: function() {
      return this.linkedTo === 'webinar';
    },
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
