import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import AddSkill from "./SkillAdd"; // Import the AddSkill form
import SkillCard from "./SkillCard"; // Assuming this will display individual skills

const SkillList = () => {
    const { user } = useContext(AuthContext); // Access the user from AuthContext
    const [userId, setUserId] = useState(null); // Store userId in local state
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [skills, setSkills] = useState([]); // Array to store fetched skills
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    

    // Update userId from user context when it's available
    useEffect(() => {
        if (user && user._id) {
            setUserId(user._id); // Set userId once user is available
        }
    }, [user]); // Only run when user changes

    // Fetch skills from the backend when the userId is available
    useEffect(() => {
        const fetchSkills = async () => {
            if (userId) { // Ensure we have a userId before fetching
                setLoading(true); // Set loading to true before fetching
                try {
                    const response = await axios.get(`http://localhost:5000/skill/getAllSkills/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization header
                        },
                    });
                    setSkills(response.data); // Set skills state with data from backend
                } catch (err) {
                    console.error("Error fetching skills:", err);
                    setError("Failed to load skills. Please try again later.");
                } finally {
                    setLoading(false); // Set loading to false once the fetch is complete
                }
            }
        };

        fetchSkills(); // Trigger fetch when userId is available
    }, [userId]); // Only fetch when userId changes or becomes available

    // Function to handle new skill addition
    const handleAddSkill = async (newSkill) => {
        try {
            const response = await axios.post(`http://localhost:5000/skill/addSkill/${userId}`, newSkill, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization header
                },
            });
            setSkills([...skills, response.data]); // Add the newly added skill to the list
            setShowModal(false); // Close the modal after adding
        } catch (error) {
            console.error("Error adding skill:", error);
            setError("Failed to add skill. Please try again.");
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-md shadow-sm w-full max-w-xl mx-auto my-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Skills</h2>
                <div className="flex space-x-2">
                    <button
                        className="text-gray-600 hover:text-purple-600"
                        onClick={() => setShowModal(true)} // Show modal when clicked
                    >
                        <FiPlus size={24} />
                    </button>
                </div>
            </div>

            <hr className="my-4 text-purple-400" />

            {/* Display loading or error message */}
            {loading && <p>Loading skills...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Skills List */}
            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} userId={userId}/> // Pass each skill to SkillCard
                ))}
            </div>

            {/* Modal for the Add Skill Form */}
            {showModal && (
                <div>
                    {/* Background Blur */}
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-40"></div>

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md relative">
                            {/* Close Modal Button */}
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowModal(false)} // Close modal on button click
                            >
                                ✖
                            </button>
                            <AddSkill onAddSkill={handleAddSkill} userId={userId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillList;
