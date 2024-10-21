import express from 'express';
import { createWebinar,getWebinars,registerForWebinar,getWebinarDetails,addToCollection} from '../controllers/webinarController.js';



const router = express.Router();

router.post("/createwebinar",createWebinar);
router.get('/getwebinar', getWebinars);
router.get('/getwebinardetails/:id',getWebinarDetails);
router.post('/registerwebinar',registerForWebinar);
router.post('/addToCollection', addToCollection);



export default router;
