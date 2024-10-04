import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,      // Skill name is mandatory
    trim: true,          // Remove any leading/trailing spaces
  },
  description: {
    type: String,
    required: true,      // Skill description is mandatory
    trim: true,
  },
  category: {
    type: String,        // Optional field to categorize skills
    enum: ['Technical', 'Creative', 'Business', 'Personal Development', 'Other'], // Possible categories
    default: 'Other',
  },
  level: {
    type: String,        // Proficiency level of the skill
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who added the skill
    ref: 'User',
    required: true,
  },
  resources:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
  },
  availableFor: {
    type: String,         // Specify whether the user wants to 'Teach' or 'Learn' this skill
    enum: ['Teach', 'Learn'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,    // Store the date when the skill was added
  },
  updatedAt: {
    type: Date,           // Store the date when the skill was last updated
    default: Date.now,
  }
});

// Automatically update the 'updatedAt' field whenever the skill document is modified
SkillSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
