// controllers/resourceController.js
import Resource from '../models/Resource.js';
import User from '../models/User.js';
import Skill from '../models/Skill.js'; // Import the Skill model if not already done
import Pdf from '../models/Pdf.js'

// Fetch a resource by ID
export const details = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId).populate('uploadedBy skill');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Increment the views for the user who uploaded the resource
    const userId = resource.uploadedBy._id; // Assuming 'uploadedBy' is the user who uploaded the resource
    await User.findByIdAndUpdate(userId, { $inc: { views: 1 } }); // Increment views by 1

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

export const uploadPdfHandler = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a PDF.' });
    }

    // Get title, uploadedBy, and skillId from the request body and params
    const { title, uploadedBy } = req.body;
    const { skillId } = req.params;

    console.log('Skill ID:', skillId);  // Log skillId
    console.log('Title:', title);        // Log title
    console.log('Uploaded By:', uploadedBy);  // Log uploadedBy

    // Validate if title, uploadedBy, and skillId are provided
    if (!title || !uploadedBy || !skillId) {
      return res.status(400).json({ error: 'Missing required fields: title, uploadedBy, or skillId.' });
    }

    // Create a new PDF document and save it in the database
    const newPdf = new Pdf({
      title,
      filePath: req.file.path,  // File path where the PDF is stored
      uploadedBy,
      skillId,
    });

    const savedPdf = await newPdf.save();
    console.log('PDF saved:', savedPdf); // Log saved PDF

    // Find the skill and update it by adding the PDF reference
    const skill = await Skill.findById(skillId);
    console.log('Retrieved Skill:', skill); // Log the retrieved skill
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // Add the new PDF reference to the skill's pdfs array
    skill.pdfs.push(savedPdf._id);
    await skill.save();

    // Respond with success message and the PDF data
    res.status(201).json({
      message: 'PDF uploaded and linked to skill successfully!',
      file: {
        filename: req.file.filename,
        path: req.file.path,
        title,          // Title provided by user
        uploadedBy,     // User ID or name
        skillId,        // Skill ID
        uploadedAt: savedPdf.uploadedAt, // Timestamp of the upload
      }
    });
  } catch (err) {
    console.error('Error uploading PDF:', err);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
};


export const getAll = async (req, res) => {
  try {
    const { skillId } = req.params;
    console.log('Fetching PDFs for Skill ID:', skillId); // Log the skillId

    const skill = await Skill.findById(skillId).populate('pdfs');
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(skill.pdfs);
  } catch (err) {
    console.error('Error fetching PDFs:', err);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
};
