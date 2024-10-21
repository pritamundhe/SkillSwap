import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WebinarCard = ({ webinar }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleJoinWebinar = async (event) => {
    event.preventDefault(); // Prevent immediate navigation

    try {
      const userEmail =localStorage.getItem('email') // Replace this with actual user email logic
      // Send email notification
      await axios.post('http://localhost:5000/webinar/registerwebinar', {
        email: userEmail,
        webinarTitle: webinar.title,
        googleMeetLink:webinar.googleMeetLink,
        description:webinar.description,
        Date:new Date(webinar.scheduledDate).toLocaleDateString(),
      });

      // Show success message
      alert('You have successfully registered for the webinar!');

      // Proceed to navigate to the webinar details page after sending the email
      window.location.href = `/webinar/${webinar._id}`;
    } catch (error) {
      alert('There was an error registering for the webinar.');
    }
  };

  return (
    <div className="flex-1 max-w-xs min-w-[300px] bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
      <h3 className="text-2xl font-bold text-purple-700 mb-4">{webinar.title}</h3>
      <p className="text-gray-600 mb-4">{webinar.description}</p>
      <div className="mb-6">
        <span className="text-3xl font-bold text-purple-800">
          {webinar.fee === 0 ? 'Free' : `${webinar.fee} USD`}
        </span>
        <br />
        <span className="text-gray-500">/webinar</span>
      </div>
      <p className="text-gray-600 mb-6">
        <strong>Date:</strong> {new Date(webinar.scheduledDate).toLocaleDateString()}
        <br />
        <strong>Time:</strong> {formatTime(webinar.scheduledDate)}
      </p>
      <div className="mb-6">
        {/* Link to the webinar details page and pass the webinar data as state */}
        <Link
          to={`/webinar/${webinar._id}`}
          state={{ webinar }}
          onClick={handleJoinWebinar }
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Join Webinar
        </Link>
      </div>
      {/* Features */}
      <ul className="list-disc list-inside text-left text-gray-600">
        {Array.isArray(webinar.features) && webinar.features.length > 0 ? (
          webinar.features.map((feature, index) => (
            <li key={index} className="py-2 border-t border-gray-300">{feature}</li>
          ))
        ) : (
          <li className="py-2 border-t border-gray-300">No features listed</li>
        )}
      </ul>
    </div>
  );
};

export default WebinarCard;
