import express from 'express';
import { getAllSkills , addSkill} from '../controllers/skillController.js';


const router = express.Router();

// Change to GET method for fetching skills
router.get("/getAllSkills/:userId", getAllSkills);
router.post('/addSkill', addSkill);


export default router;
