import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduledWebinarCard from './ScheduledWebinarCard'; // Import the new card component
import { ClipLoader } from 'react-spinners'; // For loading spinner

const ScheduledWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem('email'); // Get the logged-in user's email from localStorage

  useEffect(() => {
    const fetchRegisteredWebinars = async () => {
      try {
        // Fetch webinars the user has registered for
        const response = await axios.get(`http://localhost:5000/webinar/${userEmail}/registeredwebinars`);
        setWebinars(response.data); // Set the registered webinars data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRegisteredWebinars();
  }, [userEmail]);

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
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Registered Webinars</h1>
        <p className="text-lg text-gray-600">Here are the webinars you have registered for.</p>
      </div>

      {/* Display registered webinars in the new card style */}
      <div className="flex flex-wrap justify-center gap-8 ">
        {webinars.length > 0 ? (
          webinars.map((webinar) => (
            <ScheduledWebinarCard key={webinar._id} webinar={webinar} />
          ))
        ) : (
          <div className="text-gray-600">You haven't registered for any webinars yet.</div>
        )}
      </div>
    </div>
  );
};

export default ScheduledWebinars;
