import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from '../Reviews/ReviewList';
import { FiPlus } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const SkillPage = () => {
  const { skillId } = useParams(); // Get the skillId from URL parameters
  const [skill, setSkill] = useState(null);
  const [resources, setResources] = useState([]); // State for resources
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`http://localhost:5000/skill/skillDetails/${skillId}`); // Fetch skill details by ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSkill(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchResources = async () => {
      try {
        const response = await fetch(`http://localhost:5000/resource/${skillId}`); // Fetch resources by skill ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchSkill(), fetchResources()]); // Wait for both fetches to complete
      setLoading(false); // Set loading to false after both fetches
    };

    fetchData();
  }, [skillId]); // Run effect when skillId changes

  const handleAddToCollection = async () => {
    const userId =localStorage.getItem('userId');// Replace this with the actual user ID, possibly from context or local storage
  
    try {
      const response = await fetch('http://localhost:5000/webinar/addToCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, skillId }), // Sending userId and skillId in the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to add skill to collection');
      }
  
      const data = await response.json();
      console.log('Skill added to collection:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
    alert("Skill added to your collection");
    navigate("/collection");
  };
  
  const handleReviewAdded = (newReview) => {
    setSkill((prevSkill) => ({
      ...prevSkill,
      reviews: [...prevSkill.reviews, newReview],
    }));
  };

  // Handler to navigate to ResourcePage with resourceId
  const handleResourceClick = (resourceId) => {
    navigate(`/ResourcePage/${resourceId}`); // Navigate to the resource page using resourceId
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!skill) {
    return <div>No skill found.</div>; // Fallback in case skill is still null
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 bg-gradient-to-r from-purple-100 via-blue-50 to-blue-200">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 flex flex-col md:flex-row gap-8">
        {/* Main Skill Content */}
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg p-6">
          {/* Category Label */}
          <div className="mb-2">
            <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-1 rounded-full">
              {skill.category} {/* Dynamic category */}
            </span>
          </div>

          {/* Skill Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {skill.title} {/* Dynamic title */}
          </h1>

          {/* Skill Image */}
          <div className="relative mb-6">
            <img
              src={skill.image || '/logo192.png'}
              alt={skill.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Skill Content */}
          <div className="prose max-w-none">
            <p>{skill.content}</p> {/* Dynamic content */}
          </div>
        </div>

        {/* Sidebar with Author Info */}
        <aside className="w-full md:w-1/4 flex flex-col gap-6">
          {/* User Info Box */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {skill.addedBy?.name || 'Unknown Author'} {/* Dynamic author name with fallback */}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {skill.author?.bio || 'No bio available.'} {/* Dynamic author bio with fallback */}
            </p>
            <a href={skill.author?.link} className="text-blue-600 hover:underline inline-flex items-center">
              {/* LinkedIn Icon */}
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                {/* LinkedIn Icon SVG Path */}
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Social Share Buttons Box */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <p className="text-gray-500 text-sm mb-2">Share with your community!</p>
            <div className="flex space-x-4">
              {/* Social Share Buttons */}
              {/* Add your social share buttons here */}
              <FaFacebookSquare size={24} className="text-blue-600" />
              <FaLinkedin size={24} className="text-blue-600" />
              <FaWhatsapp size={24} className="text-green-600" />
            </div>
          </div>
          <div
            className="rounded-lg shadow-lg p-6 flex bg-purple-500 text-white gap-3 items-center hover:bg-purple-400 cursor-pointer"
            onClick={handleAddToCollection} // Call the function when clicked
          >
            <FiPlus size={20} />
            <div className="space-x-4">
              Add to your collection
            </div>
          </div>
        </aside>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-6 md:px-10 lg:px-20 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-600 text-base">
            {skill.description} {/* Dynamic description */}
          </p>
        </div>
      </div>


      {/* Resources Section */}
      <div className="container mx-auto px-6 md:px-10 lg:px-20 mt-8 ">
        <div className="bg-white rounded-lg shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-2">Resources</h2>

          {/* Display resources in a list */}
          <ul className="list-disc list-inside space-y-1">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <li
                  key={resource._id}
                  className="text-blue-600 cursor-pointer"
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
      </div>
      <div className="container mx-auto px-6 md:px-10 lg:px-20 mt-8 ">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ReviewList skill={skill} skillId={skillId} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;