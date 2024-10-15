import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import dotenv from 'dotenv';
import multer from 'multer'; // Import multer for file upload handling
import path from 'path'; // Import path for handling file extensions
import { fileURLToPath } from 'url'; // Necessary for resolving directory path
import skillRoutes from './routes/skillRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import webinarRoutes from './routes/webinarRoutes.js'

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/resource', resourceRoutes);
app.use('/skill',skillRoutes)
app.use('/review',reviewRoutes);
app.use('/webinar',webinarRoutes);

// Handle file path issues in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads


// File upload route


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
