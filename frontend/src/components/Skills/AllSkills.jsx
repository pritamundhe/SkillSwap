import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import AllSkillCard from './AllSkillCard';

const NewSkillList = () => {

  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [userId, setUserId] = useState(null); // Store userId in local state
  const [skills, setSkills] = useState([]); // Array to store fetched skills
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [showModal, setShowModal] = useState(false);

  
  

  useEffect(() => {
    const fetchSkills = async () => {
      
        try {
          const response = await axios.get(`http://localhost:5000/skill/getSkills`);
          setSkills(response.data); // Set skills state with data from backend
        } catch (err) {
          console.error("Error fetching skills:", err);
          setError("Failed to load skills. Please try again later.");
        } finally {
          setLoading(false); // Set loading to false once the fetch is complete
        }
      }
    

    fetchSkills(); // Trigger fetch when userId is available
  }, [userId]);

  
  return (
    <div className='bg-gray-50 mx-14 p-5'>
      <div className='p-4  mx-8'>
        <h2 className="text-2xl font-bold">Skills</h2>
        
      </div>
        
      <div className='flex gap-12  flex-wrap my-5 justify-center bg-gradient-to-r min-h-screen from-purple-100 to-purple-50 rounded-sm py-5'>
        {skills.map((skill, index) => (
          <AllSkillCard key={index} skill={skill} userId={userId} /> // Pass each skill to SkillCard
        ))}
      </div>
      
      
    </div>
  )
}

export default NewSkillList
