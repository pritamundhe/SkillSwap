import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebinarCard from './WebinarCard';  // Import the WebinarCard component

const JoinWebinar= () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail=localStorage.getItem('email');
  
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/webinar/getwebinar');
        setWebinars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchWebinars();
  }, []);

  if (loading) {
    return <div>Loading webinars...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r min-h-screen from-purple-300 to-blue-200 flex justify-center items-center p-8">
      <div className="flex gap-6 flex-wrap justify-center">
        {webinars.map((webinar) => (
          <WebinarCard key={webinar._id} webinar={webinar} />
        ))}
      </div>
    </div>
  );
};

export default JoinWebinar
