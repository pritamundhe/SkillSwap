import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {FiEdit2 } from 'react-icons/fi';

const NewSkillCard = ({skill,userId}) => {
    return (
        <div className=" text-black rounded-sm overflow-hidden shadow-lg transform transition-all hover:scale-102 border border-gray-500 h-96 w-80 relative">
                <div className="absolute bottom-5 right-3 h-6 w-6 bg-purple-600 text-white flex items-center justify-center rounded-sm hover:bg-purple-400" >
                <FiEdit2 size={15} />
                </div>
            <div className="relative">
                {/* Image */}
                <img
                    src=""


                    
                    alt="Skill image"
                    className="w-full  object-cover object-center transition-transform duration-300 ease-in-out"
                    style={{ width: "320px", height: "200px" }}
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
