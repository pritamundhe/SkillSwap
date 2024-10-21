import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebinarCard from './WebinarCard'; // Import the WebinarCard component
import { ClipLoader } from 'react-spinners'; // Spinner for loading
import { Link } from 'react-router-dom'; 

const JoinWebinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchWebinarsAndUser = async () => {
      try {
        // Fetch webinars
        const webinarsResponse = await axios.get('http://localhost:5000/webinar/getwebinar', {
          params: { email: userEmail } // Pass the email in the query parameters
        });
        setWebinars(webinarsResponse.data);

        // Fetch user data
        const userResponse = await axios.get(`http://localhost:5000/users/${userEmail}`);
        setUser(userResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWebinarsAndUser();
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
    <div className="bg-gradient-to-r min-h-screen from-purple-100 via-blue-50 to-blue-100 animate-gradient p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join a Webinar</h1>
          <p className="text-lg text-gray-600 ml-10">Browse through the available webinars and join the one that interests you.</p>
        </div>

        <div className="flex space-x-4">
          {/* Scheduled Webinars Button */}
          <Link to="/ScheduledWebinars">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
              Scheduled Webinars
            </button>
          </Link>

          {/* Conditionally render the Create Webinar button if views > 10 */}
          {user?.views >= 0 && (
            <Link to="/createwebinar">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                Create Webinar
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Webinars List */}
      <div className="flex flex-wrap justify-center gap-8">
        {webinars.map((webinar) => (
          <WebinarCard key={webinar._id} webinar={webinar} />
        ))}
      </div>
    </div>
  );
};

export default JoinWebinar;
