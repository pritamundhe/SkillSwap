import express from 'express';
import { createResource, getUserResources } from '../controllers/resourceController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route to create a resource
router.post('/upload',upload, createResource);

// Route to get user resources
router.get('/user/:userId', getUserResources);

export default router;
