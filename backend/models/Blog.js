const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  categories: [{ type: String }], // Array of categories
  tags: [{ type: String }], // Array of tags
  comments: [commentSchema], // Embedded comment schema
  image: { type: String }, // URL or path to the blog image
  isPublished: { type: Boolean, default: false }, // Publishing status
  publishedAt: { type: Date }, // Date of publication
  views: { type: Number, default: 0 }, // View count
  likes: { type: Number, default: 0 }, // Like count
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('Blog', blogSchema);
