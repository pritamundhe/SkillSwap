import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dqmrrds7b',
    api_key: '134959874854179',
    api_secret: '3vmDWcttNc4j0a56BgnUa0SA3kg',
});

// Cloudinary storage configuration for multer
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',  // Name of the folder where files will be stored in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],  // Allowed file types
        public_id: (req, file) => {
            return file.fieldname + '_' + Date.now();  // Custom file name in Cloudinary
        },
    },
});

// Multer middleware to handle single file upload using Cloudinary storage
const upload = multer({
    storage: cloudinaryStorage,  // Use Cloudinary for file storage
}).single('file');  // 'image' is the field name used in the form

export default upload;
