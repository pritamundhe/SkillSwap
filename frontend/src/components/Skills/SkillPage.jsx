import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from '../Reviews/ReviewList'; // Assuming this is a separate component for handling reviews.

const SkillPage = () => {
  const { skillId } = useParams(); // Get the skillId from URL parameters
  const [skill, setSkill] = useState(null);
  const [resources, setResources] = useState([]); // State for resources
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewPanel, setShowReviewPanel] = useState(false); // State to manage review panel visibility
  const navigate = useNavigate();

  // Fetch skill details and resources when component mounts
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

  // Navigate to ResourcePage when a resource is clicked
  const handleResourceClick = (resourceId) => {
    navigate(`/ResourcePage/${resourceId}`); // Navigate to the resource page using resourceId
  };

  // Toggle review panel visibility
  const toggleReviewPanel = () => {
    setShowReviewPanel(!showReviewPanel); // Toggle the state
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
    <div className="bg-white font-roboto min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Skill Title */}
        <h1 className="text-4xl font-bold text-gray-900">
          {skill.name}
        </h1>

        {/* Skill Subtitle */}
        <p className="text-xl text-gray-600 mt-2">
          Boost Your Knowledge with {skill.name}
        </p>

        {/* Author and Meta Info */}
        <div className="flex items-center mt-4">
          <img
            alt={`Profile picture of ${skill.addedBy?.name || 'the author'}`}
            className="w-10 h-10 rounded-full"
            src={skill.author?.profilePicture || 'https://via.placeholder.com/40'}
            width="40"
            height="40"
          />
          <div className="ml-3">
            <p className="text-gray-900 font-semibold">
              {skill.addedBy?.name || 'Unknown Author'}
              <span className="text-green-600"> • Follow</span>
            </p>
            <p className="text-gray-600 text-sm">
              {skill.author?.bio || 'No bio available'} • {skill.publishedAt || 'N/A'}
            </p>
          </div>
        </div>

        {/* Social Stats */}
        <div className="flex items-center mt-4 text-gray-600">
          <div className="flex items-center mr-6">
            <i className="fas fa-hand-holding-heart"></i>
            <span className="ml-2">3.3K</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-comment"></i>
            <span className="ml-2">{skill.reviews?.length || 0}</span>
          </div>
        </div>

        {/* Skill Image */}
        <div className="mt-6">
          <img
            alt={`Image of ${skill.title}`}
            className="w-full rounded-lg"
            src={skill.image || '/logo192.png'}
            width="800"
            height="400"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
          <p className="text-gray-600 text-base mt-2">
            {skill.description}
          </p>
        </div>

        {/* Resources Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <ul className="list-disc list-inside space-y-1">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <li
                  key={resource._id}
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleResourceClick(resource._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleResourceClick(resource._id)}
                >
                  {resource.title}
                </li>
              ))
            ) : (
              <li>No resources available</li>
            )}
          </ul>
        </div>

        {/* Share & Bookmark Section */}
        <div className="flex items-center justify-end mt-4 space-x-4 text-gray-600">
          <i className="fas fa-bookmark"></i>
          <i className="fas fa-play-circle"></i>
          <i className="fas fa-share-alt"></i>
          <i className="fas fa-ellipsis-h"></i>
        </div>

        {/* Reviews Section */}
        <div className="flex items-center justify-end mt-4 space-x-4">
          {/* Updated Review Button */}
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
            onClick={toggleReviewPanel}
            title="Add Review"
          >
            Add Review
          </button>
        </div>

        {/* Sliding Review Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            showReviewPanel ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 1000 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 p-2 text-gray-700"
            onClick={toggleReviewPanel}
          >
            &times;
          </button>
          
          {/* Review List Component */}
          <div className="h-full overflow-y-auto p-4">
            <ReviewList skill={skill} skillId={skillId} onReviewAdded={(newReview) => setSkill((prevSkill) => ({
              ...prevSkill,
              reviews: [...prevSkill.reviews, newReview],
            }))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;
