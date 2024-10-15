import express from 'express';
import { createWebinar,getWebinars } from '../controllers/webinarController.js';


const router = express.Router();

router.post("/createwebinar",createWebinar);
router.get('/getwebinar', getWebinars);




export default router;
