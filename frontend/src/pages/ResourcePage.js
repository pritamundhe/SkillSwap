import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResourcePage = () => {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResourceData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/resource/details/${resourceId}`);
        setResource(data);
        console.log('Fetched resource:', data);
      } catch (err) {
        console.error(err);
        setError("Failed to load resource. Please try again later.");
      } finally {
        setLoading(false);
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

  // Truncate description to 100 characters
  const truncateDescription = (desc, limit = 100) => {
    return desc && desc.length > limit ? `${desc.substring(0, limit)}...` : desc;
  };

  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="title text-4xl font-bold mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
          {resource.title}
        </h1>

        <div className="flex items-center mb-4">
          <img 
            src={resource.uploadedBy?.profilePicture || 'https://via.placeholder.com/50'} 
            alt="Author's profile" 
            className="w-12 h-12 rounded-full mr-3" 
          />
          <div>
            <div className="text-sm font-semibold">
              {resource.uploadedBy?.name || 'Unknown'} 
              <span className="text-green-600"> • Follow</span>
            </div>
            <div className="text-sm text-gray-500">
              Uploaded on {new Date(resource.uploadDate).toLocaleDateString()} • Access Level: {resource.accessLevel}
            </div>
          </div>
        </div>

        {/* Image Section */}
        {resource.file && (
          <img 
            src={resource.file} 
            alt={resource.title} 
            className="w-full h-90 object-cover mt-4" 
          />
        )}

        <div className="flex items-center text-gray-500 mb-6">
          <div className="flex items-center mr-6">
            <i className="fas fa-heart mr-1"></i> 1.91K
          </div>
          <div className="flex items-center mr-6">
            <i className="fas fa-comment mr-1"></i> 29
          </div>
          <div className="flex space-x-4">
            <i className="fas fa-bookmark"></i>
            <i className="fas fa-play-circle"></i>
            <i className="fas fa-share-alt"></i>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <p className="drop-cap text-lg mb-6" style={{ lineHeight: '1.8' }}>
          {resource.description}
        </p>

        <div className="bg-white text-gray-900">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={resource.uploadedBy?.profilePicture || 'https://via.placeholder.com/50'}
                alt="Profile picture of the author"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">{resource.uploadedBy?.name || 'Unknown'}</h1>
                <p className="text-gray-600">17.8K Followers</p>
                <p className="text-gray-600">Uploaded on {new Date(resource.uploadDate).toLocaleDateString()}</p>
              </div>
              <button className="ml-auto bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <span>Follow</span>
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <hr className="my-6" />

            <h2 className="text-xl font-bold mb-4">More from {resource.uploadedBy?.name || 'Unknown'}</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Skill Card 1 */}
              <div className="flex flex-col">
                <img
                  src={resource.skill?.image || 'https://via.placeholder.com/400'}
                  alt={resource.skill?.name || 'Skill Image'}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex items-center mt-4">
                  <img
                    src={resource.uploadedBy?.profilePicture || 'https://via.placeholder.com/50'}
                    alt="Profile picture of the author"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="ml-2 text-gray-600">{resource.uploadedBy?.name || 'Unknown'}</p>
                </div>
                <h3 className="text-lg font-bold mt-2">{resource.skill?.name || 'N/A'}</h3>
                <p className="text-gray-600">{truncateDescription(resource.skill?.description)}</p>
              </div>

              {/* Skill Card 2 */}
              <div className="flex flex-col">
                <img
                  src={resource.file || 'https://via.placeholder.com/400'}
                  alt={resource.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex items-center mt-4">
                  <img
                    src={resource.uploadedBy?.profilePicture || 'https://via.placeholder.com/50'}
                    alt="Profile picture of the author"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="ml-2 text-gray-600">{resource.uploadedBy?.name || 'Unknown'}</p>
                </div>
                <h3 className="text-lg font-bold mt-2">Additional Details</h3>
                <p className="text-gray-600">
                  Category: {resource.skill?.category || 'N/A'} <br />
                  Level: {resource.skill?.level || 'N/A'}
                </p>
              </div>
            </div>

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
    </div>
  );
};

export default ResourcePage;
