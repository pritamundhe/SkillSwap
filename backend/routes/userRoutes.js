import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile,getUser} from '../controllers/userController.js';
import upload from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.get('/',(req, res)=>{
    res.send('Welcome to the user route');
})
router.post('/register', registerUser);
router.get('/:email', getUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', upload, updateUserProfile);




export default router;
