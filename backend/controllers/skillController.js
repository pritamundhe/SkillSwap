import Skill from '../models/Skill.js';

// @desc    Get all skills
// @access  Public
export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().populate('addedBy', 'username'); // Populate addedBy to get username
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add a new skill
// @access  Private (authenticated users only)
export const addSkill = async (req, res) => {
    const { name, description, category, level, availableFor } = req.body;

    // Validate request body
    if (!name || !description || !level || !availableFor) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newSkill = new Skill({
            name,
            description,
            category,
            level,
            availableFor,
            addedBy: req.user.id // Use the ID of the authenticated user
        });

        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        console.error("Error adding skill:", error);
        res.status(500).json({ message: 'Server error' });
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
