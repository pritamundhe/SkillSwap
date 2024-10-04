import Resource from '../models/Resource.js';
import User from '../models/User.js';

export const createResource = async (req, res) => {
  try {
    const { uploadedBy, title, description, linkedTo, webinar } = req.body;

    // Check if a file is included in the request
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Create a new resource instance
    const resource = new Resource({
      title,
      description,
      uploadedBy: uploadedBy,
      linkedTo: linkedTo,
      webinar: linkedTo === 'Webinar' ? webinar : null, // Associate with a webinar if linkedTo is 'Webinar'
      file: {
        data: req.file.buffer, // Storing file data as Buffer
        contentType: req.file.mimetype // Storing the file MIME type
      },
    });

    // Save the resource to the database
    await resource.save();

    // Update the User's resources array
    await User.findByIdAndUpdate(
      uploadedBy,
      { $push: { resources: resource._id } }, // Push the new resource ID into the user's resources array
      { new: true } // Return the updated user document
    );

    return res.status(201).json({ message: 'Resource created successfully!', resource });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ error: error.message });
  }
};



// Controller to get all resources uploaded by a specific user
export const getUserResources = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters

    // Find resources uploaded by the user
    const resources = await Resource.find({ uploadedBy: userId });

    if (!resources.length) {
      return res.status(404).json({ message: 'No resources found for this user.' });
    }

    return res.status(200).json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ error: error.message });
  }
};
