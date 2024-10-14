import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllSkillCard = ({ skill }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/skill/${skill._id}`);
  };

  return (
    <div
      className="rounded-lg shadow-lg transform transition-transform hover:scale-105 border border-gray-200 h-80 w-full bg-white overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      style={{ height: '320px' }} // Fixed height for the card
    >
      {/* Image section */}
      <div className="relative">
        <img
          src={skill.image}
          alt="Skill image"
          className="w-full h-40 object-cover object-center"
        />
        {/* Add subtle purple overlay on hover */}
        <div className="absolute inset-0 bg-purple-300 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-40"></div>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Skill name */}
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {skill.name}
        </h2>

        {/* Skill description */}
        <p className="text-gray-500 text-sm mb-2 line-clamp-3">
          {skill.description}
        </p>

        {/* Button for more details */}
        <div className="mt-auto">
          <button className="w-full py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSkillCard;
