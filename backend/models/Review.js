import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who wrote the review
    ref: 'User',
    required: true,
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the resource or webinar being reviewed
    ref: 'Resource', // Could be 'Webinar' if needed; can adapt based on your requirements
    required: true,
  },
  rating: {
    type: Number,
    required: true, // Rating given by the user, e.g., from 1 to 5
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true, // Trims whitespace from the beginning and end
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the review was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the review was last updated
  },
});

// Index for efficient querying
ReviewSchema.index({ resource: 1, user: 1 }, { unique: true }); // Ensure a user can only review a resource once

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
