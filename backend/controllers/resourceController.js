// controllers/resourceController.js
import Resource from '../models/Resource.js';
import User from '../models/User.js';
import Skill from '../models/Skill.js'; // Import the Skill model if not already done

// Fetch a resource by ID
export const details = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId).populate('uploadedBy skill'); // Populate fields if necessary

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const createResource = async (req, res) => {
  try {
    const { uploadedBy, title, description } = req.body;
    const { skillId } = req.params; // Retrieve the skillId from request params

    // Check if a file is included in the request
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Create a new resource instance
    const resource = new Resource({
      title,
      description,
      uploadedBy: uploadedBy,
      skill: skillId, // Link the resource to the skill using skillId
      file: req.file.path, // Assuming the file path is stored in req.file.path
    });

    // Save the resource to the database
    await resource.save();

    // Update the User's resources array
    await User.findByIdAndUpdate(
      uploadedBy,
      { $push: { resources: resource._id } }, // Push the new resource ID into the user's resources array
      { new: true } // Return the updated user document
    );

    // Update the Skill's resources array (Make sure Skill model is imported)
    await Skill.findByIdAndUpdate(
      skillId, // Correctly reference skillId here
      { $push: { resources: resource._id } }, // Push the new resource ID into the skill's resources array
      { new: true } // Return the updated skill document
    );

    return res.status(201).json({ message: 'Resource created successfully!', resource });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ error: error.message });
  }
};



export const getResourcesBySkillId = async (req, res) => {
  try {
    const { skillId } = req.params; // Extract skillId from request params

    // Find all resources linked to the specific skill
    const resources = await Resource.find({ skill: skillId });

    // If no resources found, return a 404 response
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: 'No resources found for this skill.' });
    }

    // Return the resources
    return res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources by skillId:', error);
    return res.status(500).json({ error: 'Internal server error.' });
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
