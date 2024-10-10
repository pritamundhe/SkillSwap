import Skill from '../models/Skill.js';
import Review from '../models/Review.js';
import mongoose from 'mongoose';

export const addReview = async (req, res) => {
    console.log("Received body:", req.body); // Log the incoming request body

    const { skillId, rating, comment, userId } = req.body;

    console.log("Received Skill ID:", skillId);

    try {
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({ msg: "Skill not found" });
        }

        const newReview = new Review({
            user: userId,
            Skill: skillId,
            rating,
            comment
        });

        await newReview.save();

        skill.reviews.push(newReview._id);
        await skill.save();

        res.status(201).json({ msg: "Review added successfully", review: newReview });
    } catch (err) {
        console.error("Error in addReview:", err); // Log the error
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};


export const getReviewsForSkill = async (req, res) => {
    const { skillId } = req.params;

    // Validate skillId
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        return res.status(400).json({ message: "Invalid skill ID" });
    }

    try {
        // Assuming you're fetching reviews based on the skill ID
        const skill = await Skill.findById(skillId).populate('reviews');

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        return res.status(200).json({ reviews: skill.reviews });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
