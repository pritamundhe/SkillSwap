import React from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

const NewSkillCard = ({ skill, userId, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/skill/deleteskill/${skill._id}`, {
                data: { userId } // Sending userId to ensure proper authorization
            });
            console.log(response.data);
            onDelete(skill._id);
        } catch (error) {
            console.error("Error deleting skill:", error.response?.data?.msg || error.message);
            console.log(error);
        }
    };

    const handleAddResources = () => {
        // Logic to add resources can go here
        // For example, navigate to the add resources page or show a modal
        console.log(`Adding resources for skill: ${skill.name}`);
        // You could use `useNavigate` from `react-router-dom` to redirect to the add resources page
    };

    return (
        <div className="text-black rounded-sm overflow-hidden shadow-lg transform transition-all hover:scale-102 border border-blue-500 h-80 w-100 relative bg-white">
            <div className="absolute bottom-5 right-4 h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-sm hover:bg-blue-400"
                onClick={handleDelete}>
                <FiTrash2 size={120} />
            </div>
            <div className="relative">
                {/* Image - using a dummy image if no image is provided */}
                <img
                    src={'https://via.placeholder.com/320x160'} // Add a dummy image URL
                    alt="Skill image"
                    className="w-full object-cover object-center transition-transform duration-300 ease-in-out"
                    style={{ width: "320px", height: "160px" }}
                />
                {/* Blue overlay on hover */}
                <div className="absolute inset-0 bg-blue-300 opacity-0 transition-opacity duration-700 ease-in-out hover:opacity-50"></div>
            </div>

            <div className="p-4 relative">
                <h2 className="text-xl font-semibold mb-2 text-blue-700">
                    {skill.name}
                </h2>
                <p className="text-blue-400 mb-4 text-sm">
                    {skill.description}
                </p>
            </div>

            {/* Add Resources Button */}
            <button
                onClick={handleAddResources}
                className='bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-400 absolute bottom-5 left-5'
            >
                Add Resources
            </button>
        </div>
    );
};

export default NewSkillCard;
