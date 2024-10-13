import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResourceList = () => {
  const { userId } = useParams(); // Get userId from route parameters
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/resource/user/${userId}`);
        setResources(response.data.resources);
      } catch (err) {
        setError('Failed to fetch resources');
        console.error(err);
      }
    };

    fetchUserResources();
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Resources</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {resources.length > 0 ? (
        <ul className="list-disc pl-5">
          {resources.map((resource) => (
            <li key={resource._id} className="mb-2">
              <h3 className="font-semibold">{resource.title}</h3>
              <p>{resource.description}</p>
              <p>Linked To: {resource.linkedTo}</p>
              <p>Access Level: {resource.accessLevel}</p>
              <a href={`http://localhost:5000/resource/${resource._id}`} className="text-blue-500 underline">
                Download Resource
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
};

export default ResourceList;
