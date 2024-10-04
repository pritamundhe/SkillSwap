// uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Handle file path issues in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the images directory exists, create it if not
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true }); // Creates the directory if it doesn't exist
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir);  // Save files in the 'images' directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

// File filter to only allow certain file types (optional)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|gif/; // Allowed file types
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed')); // Reject the file
    }
};

// Multer middleware for handling single file upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Include the file filter
}).single('file'); // 'file' is the field name in the form

export default upload;
