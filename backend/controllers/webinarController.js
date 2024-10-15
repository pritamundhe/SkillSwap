import User from '../models/User.js';
import Webinar from '../models/Webinar.js';


export const createWebinar = async (req, res) => {
    try {
        const { title, description, fee, scheduledDate, duration, googleMeetLink, features, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Assuming you are using Mongoose for the User model and Webinar model
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Create a new webinar
        const newWebinar = new Webinar({
            title,
            description,
            fee,
            scheduledDate,
            duration,
            googleMeetLink,
            features,
            organizer: user._id, // Reference the user's _id
        });

        const savedWebinar = await newWebinar.save();

        return res.status(201).json({ webinar: savedWebinar });
    } catch (error) {
        console.error('Error while creating webinar:', error);
        return res.status(500).json({ error: 'Server error while creating webinar.' });
    }
};

// In your backend (e.g., Express.js)
export const getWebinars = async (req, res) => {
    try {
        const webinars = await Webinar.find();  // Fetch all webinars from the database
        res.status(200).json(webinars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching webinars' });
    }
};



