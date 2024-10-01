import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user offering to teach the skill
    ref: 'User',
    required: true,
  },
  learner: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user wanting to learn the skill
    ref: 'User',
    required: true,
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the skill being taught/learned
    ref: 'Skill',
    required: true,
  },
  status: {
    type: String,      // Status of the match
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  matchedAt: {
    type: Date,
    default: Date.now,  // Date when the match was created
  },
  completedAt: {
    type: Date,         // Date when the match is completed
  }
});

// Automatically update 'completedAt' when the status changes to 'Completed'
MatchSchema.pre('save', function (next) {
  if (this.status === 'Completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  next();
});

const Match = mongoose.model('Match', MatchSchema);

export default Match;
