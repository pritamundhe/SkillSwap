import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from '../Reviews/ReviewList'; // Assuming this is a separate component for handling reviews.
import { FiPlus } from "react-icons/fi";

const SkillPage = () => {
  const { skillId } = useParams(); // Get the skillId from URL parameters
  const [skill, setSkill] = useState(null);
  const [resources, setResources] = useState([]); // State for resources
  const [pdfs, setPdfs] = useState([]); // State for PDFs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewPanel, setShowReviewPanel] = useState(false); // State to manage review panel visibility
  const navigate = useNavigate();

  // Fetch skill details, resources, and PDFs when component mounts
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

    const fetchPdfs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pdf/getAll/${skillId}`); // Fetch PDFs by skill ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchSkill(), fetchResources(), fetchPdfs()]); // Wait for all fetches to complete
      setLoading(false); // Set loading to false after all fetches
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

  const handleAddToCollection = async () => {
    const userId = localStorage.getItem('userId'); // Replace this with the actual user ID, possibly from context or local storage

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

  // Function to handle PDF click
  const handlePdfClick = (pdfPath) => {
    const baseUrl = 'http://localhost:5000/'; // Base URL of your server
    window.open(`${baseUrl}${pdfPath}`, '_blank'); // Open the PDF in a new tab with the full URL
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
    <div className="bg-white font-roboto min-h-screen flex">
      <div className="max-w-4xl mx-auto p-6 flex-1">
        {/* Skill Title */}
        <h1 className="text-4xl font-bold text-gray-900">{skill.name}</h1>

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

        {/* PDF Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">PDFs</h2>
          <ul className="list-disc list-inside space-y-1">
            {pdfs.length > 0 ? (
              pdfs.map((pdf) => (
                <li
                  key={pdf._id}
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handlePdfClick(pdf.filePath)} // Assuming pdf.url contains the URL of the PDF
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePdfClick(pdf.filePath)}
                >
                  {pdf.title}
                </li>
              ))
            ) : (
              <li>No PDFs available</li>
            )}
          </ul>
        </div>

        {/* Share & Bookmark Section */}
        <div className="flex items-center justify-end mt-4 space-x-4 text-gray-600">
          <i className="fas fa-bookmark cursor-pointer" onClick={handleAddToCollection}>
            <span className="ml-2">Add to Collection</span>
          </i>
          <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={toggleReviewPanel}>
            <FiPlus className="mr-2" />
            Add a Review
          </button>
        </div>
      </div>

      {/* Review Panel */}
      {showReviewPanel && (
        <div className="w-1/3 bg-gray-100 p-4">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <ReviewList skillId={skillId} /> {/* Pass the skillId to the ReviewList component */}
        </div>
      )}
    </div>
  );
};

export default SkillPage;
