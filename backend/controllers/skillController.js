import Skill from '../models/Skill.js';
import User from '../models/User.js';

// Ensure your Skill model has an addedBy field that references the User model
// and the User model has a username field
export const getAllSkills = async (req, res) => {
    const userId = req.params.userId; // Extract the userId from the request params
    try {
        const skills = await Skill.find({ addedBy: userId }).populate('addedBy', 'username'); // Adjust the query to filter by user
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSkills = async (req, res) => {
    
    try {
        const skills = await Skill.find(); // Adjust the query to filter by user
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addSkill = async (req, res) => {
    const { name, description, category, level, addedBy } = req.body;

    // Log the request body and file for debugging
    console.log('Request Body:', req.body);
    console.log('File:', req.file); // This should log the file details

    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    try {
        // Create a new skill with the image path
        const newSkill = new Skill({
            name,
            description,
            category,
            level,
            image: req.file.path, // Save the file path (or buffer if needed)
            addedBy, // Use the ID of the authenticated user
        });

        // Save the new skill to the database
        const savedSkill = await newSkill.save();

        // Update the user's skillsOffered array
        await User.findByIdAndUpdate(
            addedBy,
            { $push: { skillsOffered: savedSkill._id } }, // Add the skill to the user's list
            { new: true }
        );

        // Respond with the saved skill
        res.status(201).json(savedSkill);
    } catch (error) {
        console.error('Error adding skill:', error);
        return res.status(500).json({ error: error.message });
    }
};



// @desc    Update a skill
// @access  Private (authenticated users only)
export const updateSkill = async (req, res) => {
    const { name, description, category, level, availableFor } = req.body;

    // Validate request body
    if (!name || !description || !level || !availableFor) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const skill = await Skill.findById(req.params.id);

        // Check if the skill exists
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        // Check if the user is the one who added the skill
        if (skill.addedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Update the skill
        skill.name = name;
        skill.description = description;
        skill.category = category;
        skill.level = level;
        skill.availableFor = availableFor;
        skill.updatedAt = Date.now(); // Update the updatedAt field

        const updatedSkill = await skill.save();
        res.status(200).json(updatedSkill);
    } catch (error) {
        console.error("Error updating skill:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteSkill = async (req, res) => {
    const { id } = req.params; // Skill ID from URL
    const { userId } = req.body; // User ID from request body

    console.log(`Received request to delete skill with ID: ${id} for user ID: ${userId}`);

    try {
        const skill = await Skill.findOneAndDelete({ _id: id, addedBy: userId }); // Check against addedBy

        if (!skill) {
            console.log("Skill not found or unauthorized for deletion.");
            return res.status(404).json({ msg: "Skill not found or unauthorized" });
        }
        
        res.json({ msg: "Skill deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const skillDetails=async (req,res)=>{
    const skillId = req.params.skillId; // Extract the userId from the request params
    try {
        const skills = await Skill.findOne({ _id: skillId }).populate('addedBy', 'name'); // Adjust the query to filter by user
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: 'Server error' });
    }

};

export const getCollection =async(req,res)=>{
    try {
    const { userId } = req.params;
    // Fetch user's collection of skills
    const user = await User.findById(userId).populate('collection'); // Assuming collection is an array of skills
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.collection); // Send the collection
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collection', error });
  }
}