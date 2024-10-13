import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import ReviewList from '../Reviews/ReviewList';

const SkillPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [skill, setSkill] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skill details and resources
  useEffect(() => {
    const fetchSkillData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch skill details
        const skillResponse = await axios.get(`http://localhost:5000/skill/SkillDetails/${skillId}`);
        setSkill(skillResponse.data);

        // Fetch related resources by skill ID
        const resourceResponse = await axios.get(`http://localhost:5000/resource/${skillId}`);
        setResources(resourceResponse.data); // Assuming API response contains the list of resources

      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to load skill details or resources. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchSkillData();
  }, [skillId]);

  // Callback function to update reviews after submission
  const handleReviewAdded = (newReview) => {
    setSkill((prevSkill) => ({
      ...prevSkill,
      reviews: [...prevSkill.reviews, newReview],
    }));
  };

  // Handler to navigate to ResourcePage with resourceId
  const handleResourceClick = (resourceId) => {
    navigate(`/ResourcePage/${resourceId}`); // Navigate to the resource page using resourceId
  };

  if (loading) {
    return <p>Loading...</p>; // You might replace this with a spinner component
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!skill) {
    return <p>No skill found</p>;
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="mx-auto p-4 space-y-6 bg-gradient-to-r min-h-screen from-purple-300 to-blue-100">
        <h1 className="text-5xl font-bold text-center text-purple-600">{skill.name}</h1>

        <div className="relative w-full h-64 md:h-96">
          <img
            src={skill.image || '/logo192.png'}
            alt={skill.name}
            className="w-3/5 mx-auto h-full object-cover rounded-lg my-4"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Resources</h2>

          {/* Display resources in a list */}
          <ul className="list-disc list-inside space-y-1">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <li
                  key={resource._id}
                  className="text-blue-600 cursor-pointer" // Styling for clickable text
                  onClick={() => handleResourceClick(resource._id)} // Navigate on click
                  role="button" // Adding role for accessibility
                  tabIndex={0} // Making it keyboard accessible
                  onKeyDown={(e) => e.key === 'Enter' && handleResourceClick(resource._id)} // Handle Enter key for accessibility
                >
                  {resource.title}
                </li>
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

        {/* Review Section */}
        <div className="mt-6">
          <ReviewList skill={skill} skillId={skillId} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;
