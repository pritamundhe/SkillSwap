import Skill from '../models/Skill.js';

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



// @desc    Add a new skill
// @access  Private (authenticated users only)
export const addSkill = async (req, res) => {
    try {
      // Destructure necessary fields from request body
      const { name, description, category, level, availableFor } = req.body;
      const { id: uploadedBy } = req.user; // Assuming req.user contains the authenticated user info
  
      // Validate required fields
      if (!name || !description || !level || !availableFor) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
  
      // Create a new skill instance
      const newSkill = new Skill({
        name,
        description,
        category,
        level,
        availableFor,
        addedBy: uploadedBy, // Using the authenticated user ID
      });
  
      // Save the skill to the database
      const savedSkill = await newSkill.save();
  
      // Update the User's skills offered array
      await User.findByIdAndUpdate(
        uploadedBy,
        { $push: { skillsOffered: savedSkill._id } }, // Push the new skill ID into the skills offered array
        { new: true } // Return the updated user document
      );
  
      return res.status(201).json({
        message: 'Skill added successfully!',
        skill: savedSkill,
      });
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

// @desc    Delete a skill
// @access  Private (authenticated users only)
export const deleteSkill = async (req, res) => {
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

        await skill.remove();
        res.status(200).json({ message: 'Skill removed' });
    } catch (error) {
        console.error("Error deleting skill:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
