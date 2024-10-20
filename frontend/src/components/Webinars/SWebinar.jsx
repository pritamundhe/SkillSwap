import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const SWebinar = () => {
  const location = useLocation();
  const { id } = useParams(); // Assuming you pass webinar ID in the route.
  const [webinar, setWebinar] = useState(location.state?.webinar || null); // Fallback to location.state if available.
  const [loading, setLoading] = useState(!webinar); // Only show loader if webinar is not present.
  const [error, setError] = useState(null);

  // Function to fetch webinar details if location.state is null
  const fetchWebinar = async (webinarId) => {
    try {
      const response = await axios.get(`http://localhost:5000/webinar/getwebinardetails/${webinarId}`);
      setWebinar(response.data);
      setLoading(false);
    } catch (err) {
      setError('Webinar not found');
      setLoading(false);
    }
  };

  // UseEffect hook to fetch webinar if state is not passed
  useEffect(() => {
    if (!webinar) {
      fetchWebinar(id); // Fetch the webinar by ID if not in location.state
    }
  }, [id, webinar]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div>Loading webinar details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-200 flex items-center justify-center p-4 min-h-screen rounded-md">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 bg-opacity-45">
        <h2 className="text-4xl text-purple-600 font-bold mb-4">Congratulations!</h2>
        <h4 className="text-lg text-gray-600 mb-6">You have successfully registered for this webinar.</h4>

        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-purple-800 mb-4">{webinar.title}</h1>
          <p className="text-gray-700 mb-4">{webinar.description}</p>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-purple-600 mr-2">Date:</span>
              <span className="text-gray-700">
                {new Date(webinar.scheduledDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold text-purple-600 mr-2">Time:</span>
              <span className="text-gray-700">{formatTime(webinar.scheduledDate)}</span>
            </div>
          </div>

          <h3 className="font-semibold text-purple-700 mb-2">Link to join:</h3>
          <p className="text-blue-500 underline hover:text-blue-700 transition">
            <a href={webinar.googleMeetLink || '#'} target="_blank" rel="noopener noreferrer">
              {webinar.googleMeetLink || 'Join Link'}
            </a>
          </p>
        </div>
        <h1 className='text-gray-400 text-[13px]'>We will notify you if any changes (date / time)</h1>
      </div>
    </div>
  );
};

export default SWebinar;
