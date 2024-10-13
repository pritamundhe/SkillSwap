import express from 'express';
import { createResource, details, getResourcesBySkillId, getUserResources } from '../controllers/resourceController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route to create a resource
router.post('/upload/:skillId',upload, createResource);

// Route to get user resources
router.get('/user/:userId', getUserResources);
router.get('/:skillId', getResourcesBySkillId);
router.get('/details/:id',details );

export default router;
