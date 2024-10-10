import express from 'express';
import { getAllSkills , addSkill,deleteSkill,getSkills} from '../controllers/skillController.js';
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router();

// Change to GET method for fetching skills
router.get("/getAllSkills/:userId", getAllSkills);
router.get("/getSkills", getSkills);
router.post('/addSkill',upload, addSkill);
router.delete('/deleteskill/:id', deleteSkill);


export default router;
