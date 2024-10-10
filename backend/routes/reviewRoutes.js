import express from 'express';
const router = express.Router();
import { addReview ,getReviewsForSkill} from '../controllers/reviewController.js';


router.post('/addReview', addReview);
router.get('/getReview/:skillId', getReviewsForSkill);


export default router;