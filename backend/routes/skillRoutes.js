import express from 'express';

import upload from '../middleware/uploadMiddleware.js'

import { getAllSkills , addSkill,deleteSkill,getSkills,skillDetails,getCollection } from '../controllers/skillController.js';


const router = express.Router();

// Change to GET method for fetching skills
router.get("/getAllSkills/:userId", getAllSkills);
router.get("/getSkills", getSkills);
router.post('/addSkill',upload, addSkill);
router.delete('/deleteskill/:id', deleteSkill);
router.get("/skillDetails/:skillId",skillDetails);
router.get("/getcollection/:userId",getCollection );


export default router;
