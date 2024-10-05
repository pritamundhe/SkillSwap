import express from 'express';
import { getAllSkills , addSkill} from '../controllers/skillController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Change to GET method for fetching skills
router.get("/getAllSkills/:userId", getAllSkills);
router.post("/addSkill/:userId",authMiddleware,addSkill);

export default router;
