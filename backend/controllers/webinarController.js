import Webinar from '../models/Webinar.js'; // Import the Webinar model
import { validationResult } from 'express-validator'; // For validating inputs

// Create Webinar Controller
export const createWebinar = async (req, res) => {
  // Validate request body and handle errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { title, description, fee, date, time, googleMeetLink, features } = req.body;

  try {
    // Validate if all features are provided (3 features required)
    if (features.length !== 3) {
      return res.status(400).json({ message: 'You must provide exactly 3 features.' });
    }

    // Check for valid date and time (basic check)
    const webinarDate = new Date(`${date} ${time}`);
    if (isNaN(webinarDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date or time format' });
    }

    // Create a new Webinar instance with the provided data
    const newWebinar = new Webinar({
      title,
      description,
      fee,
      date: webinarDate,  // Store as a single date-time
      googleMeetLink,
      features,
      createdBy: req.user._id // Assume that the user is authenticated, and req.user contains user info
    });

    // Save the webinar in the database
    const savedWebinar = await newWebinar.save();

    // Respond with the newly created webinar
    return res.status(201).json({
      message: 'Webinar created successfully',
      webinar: savedWebinar
    });

  } catch (error) {
    console.error('Error while creating webinar:', error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};
