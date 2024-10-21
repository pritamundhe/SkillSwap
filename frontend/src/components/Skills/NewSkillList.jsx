import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import NewSkillCard from './NewSkillCard'
import { AuthContext } from '../../contexts/AuthContext';
import { FiPlus } from 'react-icons/fi';
import AddSkill from "./SkillAdd";

const NewSkillList = () => {

  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [userId, setUserId] = useState(null); // Store userId in local state
  const [skills, setSkills] = useState([]); // Array to store fetched skills
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [showModal, setShowModal] = useState(false);

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
  // Update userId from user context when it's available
  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id); 
    }
  }, [user]);

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
  }, [userId]);

  const handleDeleteSkill = (skillId) => {
    setSkills(skills.filter(skill => skill._id !== skillId)); // Remove the deleted skill from state
};
  return (
    <div className=' mx-14 p-5'>
      <div className='p-4 flex justify-around mx-8'>
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex space-x-2 ml-auto">
          <button
            className="text-gray-600 hover:text-purple-600"
            onClick={() => setShowModal(true)} // Show modal when clicked
          >
            <FiPlus size={30} />
          </button>
        </div>
      </div>
      <div className='flex gap-8  flex-wrap my-5 justify-center rounded-sm py-5'>
        {skills.map((skill, index) => (
          <NewSkillCard key={index} skill={skill} userId={userId} onDelete={handleDeleteSkill}/> // Pass each skill to SkillCard
        ))}
      </div>
      {showModal && (
        <div>
          {/* Background Blur */}
          <div className="fixed inset-0 backdrop-blur-sm z-40"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="max-w-lg w-full h-5/6 mx-auto bg-white rounded-lg shadow-md relative">
              {/* Close Modal Button */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)} // Close modal on button click
              >
              Add Skill  ✖
              </button>
              <AddSkill onAddSkill={handleAddSkill} userId={userId} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewSkillList;
