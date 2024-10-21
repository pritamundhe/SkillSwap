import express from 'express';
import { createResource, details, getAll, getResourcesBySkillId, getUserResources, uploadPdfHandler } from '../controllers/resourceController.js';
import upload from '../middleware/uploadMiddleware.js';
import uploadPdf from '../middleware/pdfUpload.js';


const router = express.Router();

// Route to create a resource
router.post('/upload/:skillId',upload, createResource);

// Route to get user resources
router.get('/user/:userId', getUserResources);
router.get('/:skillId', getResourcesBySkillId);
router.get('/details/:id',details );
router.post('/upload/pdf/:skillId', uploadPdf, uploadPdfHandler);
// Assuming you have something like this in your routes file
router.get('/getAll/:skillId', getAll);


export default router;
