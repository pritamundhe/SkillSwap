import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResourcePage = () => {
  const { resourceId } = useParams(); // Get the resourceId from the URL
  const [resource, setResource] = useState(null); // State to hold the resource details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch resource details when the component mounts
  useEffect(() => {
    const fetchResourceData = async () => {
      setLoading(true); // Start loading
      try {
        const { data } = await axios.get(`http://localhost:5000/resource/details/${resourceId}`);
        setResource(data); // Set the fetched resource data
        console.log('Fetched resource:', data); // Log the fetched resource data
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to load resource. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchResourceData();
  }, [resourceId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p>{error}</p></div>;
  }

  if (!resource) {
    return <div className="flex justify-center items-center h-screen"><p>No resource found</p></div>;
  }

  return (
    <div className="w-10/12 mx-auto min-h-screen py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="p-6 space-y-4">
          <h1 className="text-4xl font-bold text-purple-600">{resource.title}</h1>

          {/* Resource Image */}
          {resource.file && (
            <img 
              src={resource.file} 
              alt={resource.title} 
              className="w-full h-64 object-cover mt-4" 
            />
          )}

          <p className="text-gray-500 text-sm">
            <strong>Uploaded By:</strong> {resource.uploadedBy?.name || 'Unknown'} | 
            <strong> Uploaded On:</strong> {new Date(resource.uploadDate).toLocaleDateString()} |
            <strong> Access Level:</strong> {resource.accessLevel}
          </p>

          <p className="text-lg font-semibold">Description:</p>
          <p className="text-gray-600">{resource.description}</p>

          {/* Skill Information */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-purple-500">Skill Details</h2>
            <p><strong>Name:</strong> {resource.skill?.name || 'N/A'}</p>
            <p><strong>Description:</strong> {resource.skill?.description || 'N/A'}</p>
            <p><strong>Category:</strong> {resource.skill?.category || 'N/A'}</p>
            <p><strong>Level:</strong> {resource.skill?.level || 'N/A'}</p>
            {resource.skill?.image && (
              <img 
                src={resource.skill.image} 
                alt={resource.skill.name} 
                className="w-full h-48 object-cover mt-2" 
              />
            )}
          </div>

          {/* Display the file link if it exists */}
          {resource.file && (
            <div className="mt-4">
              <a
                href={resource.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
