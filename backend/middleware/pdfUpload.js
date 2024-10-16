import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create a directory for PDF uploads if it doesn't exist
const uploadDir = 'uploads/pdf';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage engine for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the destination to the 'uploads/pdf' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique file name
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Save the file with a unique name
  }
});

// File filter to only allow PDF files
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept PDF file
  } else {
    cb(new Error('Only PDF files are allowed!'), false); // Reject non-PDF files
  }
};

// Multer configuration for file upload
const uploadPdf = multer({
  storage: storage,    // Use local storage configuration
  fileFilter: pdfFilter, // Use the file filter to restrict uploads to PDF files
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('file'); // 'file' is the field name in the form

export default uploadPdf;
