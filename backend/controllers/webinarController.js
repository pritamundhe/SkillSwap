import nodemailer from 'nodemailer';
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
export const registerForWebinar = async (req, res) => {
    const { email, webinarTitle, googleMeetLink, description, Date } = req.body;
    console.log(req.body);
    console.log(email);
  
    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use any email service
      auth: {
        user: 'contact.skillswap@gmail.com', // Use your email
        pass: 'mtmstfcenrryopyi', // Use your email password
      },
    });
  
    const mailOptions = {
      from: 'contact.skillswap@gmail.com', // Sender address
      to: email, // Recipient address (user's email)
      subject: `Registration Confirmation for ${webinarTitle}`,
      text: `
        Hi,
  
        Thank you for registering for the webinar: "${webinarTitle}" on SkillSwap! 
  
        Description: 
        ${description}
  
        The webinar is scheduled for: ${Date}
  
        You can join the session using the following Google Meet link:
        ${googleMeetLink}
  
        We are excited to have you join us and look forward to your participation!
  
        If you have any questions, feel free to reach out to us at SkillSwap.
  
        Best regards,
        The SkillSwap Team
      `,
    };
  
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).send('Registration email sent!');
    } catch (error) {
      res.status(500).send('Error sending email.');
    }
  };
  

  export const getWebinarDetails = async (req, res) => {
    const { id } = req.params;  // Extract the id from req.params
    try {
        const webinar = await Webinar.findById(id);  // Use findById to directly search by ID
        if (!webinar) {
            return res.status(404).json({ message: 'Webinar not found' });
        }
        res.status(200).json(webinar);
    } catch (error) {
        console.error('Error fetching webinar:', error);  // Log error for debugging
        res.status(500).json({ message: 'Error fetching webinar' });
    }
};

export const addToCollection = async (req, res) => {
    const { userId, skillId } = req.body; // Assume you're sending userId and skillId in the request body
  
    try {
      // Find the user by ID and update their collection
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { collection: skillId } }, // Add skillId to the collection (using $addToSet to avoid duplicates)
        { new: true }
      ).populate('collection'); // Optionally populate the collection to return the full skill details
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Skill added to collection', user });
    } catch (error) {
      console.error('Error adding skill to collection:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  