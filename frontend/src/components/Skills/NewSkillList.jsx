import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import NewSkillCard from './NewSkillCard'
import { AuthContext } from '../../contexts/AuthContext';

const NewSkillList = () => {

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


  return (
    <div className='flex gap-8 mx-14 flex-wrap my-5'>
      {skills.map((skill, index) => (
                    <NewSkillCard key={index} skill={skill} userId={userId}/> // Pass each skill to SkillCard
                ))}
    </div>
  )
}

export default NewSkillList
