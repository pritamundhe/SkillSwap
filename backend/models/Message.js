import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user sending the message
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user receiving the message
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true, // Message content
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the message was created
  },
  match: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the associated match (if applicable)
    ref: 'Match',
  },
  isRead: {
    type: Boolean,
    default: false, // Indicates if the message has been read
  }
});

// Index for efficient querying
MessageSchema.index({ createdAt: 1, match: 1 }); // Index messages by date and match

const Message = mongoose.model('Message', MessageSchema);

export default Message;
