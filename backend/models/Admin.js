import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure each admin has a unique username
    trim: true, // Trims whitespace from the beginning and end
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each admin has a unique email
    trim: true,
    lowercase: true, // Store email in lowercase for consistency
  },
  password: {
    type: String,
    required: true, // Password must be provided
  },
  profilePic: {
    type: String, // URL of the admin's profile picture stored in MongoDB
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the admin account was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the admin account was last updated
  },
  lastLogin: {
    type: Date, // Timestamp for the last time the admin logged in
  },
  isSuperAdmin: {
    type: Boolean,
    default: false, // Indicates if the admin has super admin privileges
  },
});

// Middleware to update the updatedAt timestamp before saving
AdminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
