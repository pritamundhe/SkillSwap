import mongoose from 'mongoose';

const WebinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the webinar
  },
  description: {
    type: String,
    required: true, // Description of the webinar content
  },
  scheduledDate: {
    type: Date,
    required: true, // Date and time the webinar is scheduled for
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user organizing the webinar
    ref: 'User',
    required: true,
  },
  fee :{
    type:Number
  },
  features: [{
    type: String, // Array of strings to list features
  }],
  googleMeetLink :{
    type: String,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId, // References to users attending the webinar
    ref: 'User',
  }],
  resources: [{
    type: mongoose.Schema.Types.ObjectId, // References to resources related to the webinar
    ref: 'Resource',
  }],
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the webinar was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the webinar was last updated
  }
});

// Index for efficient querying
WebinarSchema.index({ scheduledDate: 1, organizer: 1 }); // Index by date and organizer

const Webinar = mongoose.model('Webinar', WebinarSchema);

export default Webinar;
