import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const ScheduledWebinarCard = ({ webinar }) => {
  return (
    <Link to={`/scheduled-webinar/${webinar._id}`} className="no-underline">
      <div className="w-64 h-80 bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu cursor-pointer">
        
        {/* Title and description */}
        <div>
          <h3 className="text-2xl font-bold text-purple-700 mb-4">{webinar.title}</h3>
          <h2 className="text-lg text-gray-500">{webinar.description}</h2>
        </div>

        {/* Date and time - moved to the bottom */}
        <div className="mt-auto">
          <p className="text-gray-600 mb-2">
            <strong>Date:</strong> {new Date(webinar.scheduledDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <strong>Time:</strong> {new Date(webinar.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ScheduledWebinarCard;
