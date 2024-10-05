import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile} from '../controllers/userController.js';


const router = express.Router();

router.get('/',(req, res)=>{
    res.send('Welcome to the user route');
})
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:userId', getUserProfile);
router.put('/profile', updateUserProfile);




export default router;
