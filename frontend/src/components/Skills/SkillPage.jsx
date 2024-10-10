import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewList from '../Reviews/ReviewList';

const SkillDetails = () => {
  const { skillId } = useParams(); // Get the skill ID from the URL
  const [skill, setSkill] = useState(null); // State to store skill details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/skill/SkillDetails/${skillId}`);
        setSkill(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching skill details:", err);
        setError("Failed to load skill details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [skillId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!skill) {
    return <p>No skill found</p>;
  }

  return (
    <div className="w-10/12 mx-auto">
    <div className=" mx-auto p-4 space-y-6 bg-gradient-to-r min-h-screen from-purple-300 to-blue-100 ">
      <h1 className="text-5xl font-bold text-center text-purple-600">{skill.name}</h1>
      
      <div className="relative w-full h-64 md:h-96">
        <img
          src={skill.image || '/logo192.png'} // Use a default image if none is available
          alt={skill.name}
          className="w-3/5 mx-auto h-full object-cover rounded-lg my-4"
        />
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Resources</h2>
        <ul className="list-disc list-inside space-y-1">
          {skill.resources && skill.resources.length > 0 ? (
            skill.resources.map((resource, index) => (
              <li key={index}>{resource.name}</li> // Adjust the resource field name as needed
            ))
          ) : (
            <li>No resources available</li>
          )}
        </ul>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600">{skill.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">📚 Category: {skill.category}</span>
          <span className="flex items-center">👤 Level: {skill.level}</span>
        </div>
      </div>
    </div>
      <ReviewList />
    </div>

  );
  
};

export default SkillDetails;