import express from 'express';
import { getAllSkills , addSkill,deleteSkill,getSkills} from '../controllers/skillController.js';


const router = express.Router();

// Change to GET method for fetching skills
router.get("/getAllSkills/:userId", getAllSkills);
router.get("/getSkills", getSkills);
router.post('/addSkill', addSkill);
router.delete('/deleteskill/:id', deleteSkill);


export default router;
