import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

const NewSkillCard = ({ skill, userId,onDelete  }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/skill/deleteskill/${skill._id}`, {
                data: { userId } // Sending userId to ensure proper authorization
            });
            console.log(response.data);
            onDelete(skill._id); 
        } catch (error) {
            console.error("Error deleting skill:", error.response?.data?.msg || error.message);
            console.log(error);
        }
    };
    return (
        <div className=" text-black rounded-sm overflow-hidden shadow-lg transform transition-all hover:scale-102 border border-gray-500 h-80 w-64 relative bg-white">
            <div className="absolute bottom-5 right-3 h-6 w-6 bg-purple-600 text-white flex items-center justify-center rounded-sm hover:bg-purple-400" 
            onClick={handleDelete} >
                < FiTrash2 size={15} />
            </div>
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

            <div className="p-4 relative">

                <h2 className="text-xl font-semibold mb-2">
                    {skill.name}
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                    {skill.description}
                </p>

            </div>
            <div className='bg-purple-600 text-white px-2 w-fit rounded-sm hover:bg-purple-400 absolute bottom-5 left-5'>
                Add Resources
            </div>
            
        </div>
    )
}

export default NewSkillCard
