import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // For loading spinner

const ScheduledWebinarDetails = () => {
  const { id } = useParams(); // Get the webinar ID from the URL params
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/webinar/${id}`);
        setWebinar(response.data); // Set the webinar details data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWebinarDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r min-h-screen from-purple-100 via-blue-50 to-blue-100 p-8">
      {webinar && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">{webinar.title}</h1>

          <p className="text-lg text-gray-700 mb-6">
            <strong>Description:</strong> {webinar.description}
          </p>

          <p className="text-lg text-gray-700 mb-4">
            <strong>Date:</strong> {new Date(webinar.scheduledDate).toLocaleDateString()}
          </p>

          <p className="text-lg text-gray-700 mb-4">
            <strong>Time:</strong> {new Date(webinar.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          <p className="text-lg text-gray-700 mb-6">
            <strong>Google Meet Link:</strong> <a href={webinar.googleMeetLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{webinar.googleMeetLink}</a>
          </p>

          {webinar.features && webinar.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Features:</h2>
              <ul className="list-disc list-inside">
                {webinar.features.map((feature, index) => (
                  <li key={index} className="text-lg text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduledWebinarDetails;
