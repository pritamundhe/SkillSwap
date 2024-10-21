import express from 'express';
import Webinar from '../models/Webinar.js';
import { createWebinar,getWebinars,registerForWebinar,getWebinarDetails,addToCollection,getRegisteredWebinars} from '../controllers/webinarController.js';



const router = express.Router();

router.post("/createwebinar",createWebinar);
router.get('/getwebinar', getWebinars);
router.get('/getwebinardetails/:id',getWebinarDetails);
router.post('/registerwebinar',registerForWebinar);
router.post('/addToCollection', addToCollection);
router.get('/:email/registeredwebinars',getRegisteredWebinars);

router.get('/:id', async (req, res) => {
    try {
      const webinar = await Webinar.findById(req.params.id);
      if (!webinar) {
        return res.status(404).json({ message: 'Webinar not found' });
      }
      res.json(webinar);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching webinar details' });
    }
  });


export default router;
