import React from 'react'
import { useNavigate } from 'react-router-dom';

const AllSkillCard = ({skill}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/skill/${skill._id}`); // Navigate to skill details page with skill ID
      };
  return (

    <div className=" text-black rounded-sm overflow-hidden shadow-purple-300 shadow-lg transform transition-all hover:scale-102 border border-gray-500 h-80 w-64 relative bg-white
     " onClick={handleCardClick}>
            
            <div className="relative">
                {/* Image */}
                <img
                    src=""
                    alt="Skill image"
                    className="w-full  object-cover object-center transition-transform duration-300 ease-in-out"
                    style={{ width: "320px", height: "160px" }}
                />
                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-purple-300 opacity-0 transition-opacity duration-700 ease-in-out hover:opacity-50"></div>
            </div>

            <div className="p-4 relative bg-gradient-to-r min-h-screen from-gray-200 to-gray-50 h-full">

                <h2 className="text-xl font-semibold mb-2">
                    {skill.name}
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                    {skill.description}
                </p>

            </div>
            
            
        </div>
  )
}

export default AllSkillCard