import express from 'express';
import { createResource, getUserResources } from '../controllers/resourceController.js';

const router = express.Router();

// Route to create a resource
router.post('/upload', createResource);

// Route to get user resources
router.get('/user/:userId', getUserResources);

export default router;
