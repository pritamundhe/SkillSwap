import mongoose from 'mongoose';

// Define schema for PDF resources
const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // PDF must have a title
  },
  filePath: {
    type: String,
    required: true, // File path where the PDF is stored
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the 'User' model
    required: true, // Ensure that we know who uploaded the file
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill', // Referencing the 'Skill' model to associate the PDF with a skill
    required: true, // Ensure that each PDF is linked to a specific skill
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Automatically set the date of upload
  },
});

// Create and export the model
const Pdf = mongoose.model('Pdf', pdfSchema);
export default Pdf;
