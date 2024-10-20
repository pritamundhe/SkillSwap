import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import ProfileEdit from './ProfileEdit';  // Import the ProfileEdit component
import VerifiedIcon from './VerifiedIcon';  // Import the VerifiedIcon component

const ProfileView = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [showModal, setShowModal] = useState(false);  // State to control the modal visibility

    const userId = user ? user._id : null;

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/profile/${userId}`);
                setProfileData(response.data);
                console.log('Profile Data:', response.data);  // Check if views is updated
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (userId) {
            fetchProfileData();
        }
    }, [userId]);

    if (!profileData) {
        return <div className="text-center">Loading...</div>;
    }

    const skillsOffered = profileData.skillsOffered || [];
    console.log('Profile Data:', profileData);
    console.log('Profile Views:', profileData.views);

    // Function to truncate text
    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-start">
                {/* Left Section - Main Profile Content */}
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold mb-4 flex items-center">
                        {profileData.name}
                        {profileData.views > 0 && (
                            <span className="ml-2 flex items-center">
                                <VerifiedIcon />  {/* Verified icon */}
                                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
                                    Verified
                                </span>
                            </span>
                        )}
                    </h1>

                    <nav className="mb-8">
                        <ul className="flex space-x-4">
                            <li className="border-b-2 border-black pb-1">
                                <a href="#" className="text-black">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500">About</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Profile Section */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
                        <div className="flex items-center mb-4">
                            <img
                                src={profileData.image || 'https://placehold.co/40x40'}
                                alt={`Profile picture of ${profileData.name}`}
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <span className="font-semibold">{profileData.name}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Reading list</h2>
                        <p className="text-gray-500">No stories <i className="fas fa-lock"></i></p>
                    </div>

                    {/* Skills Section */}
                    <div className="grid grid-cols-3 gap-4">
                        {skillsOffered.length > 0 ? (
                            skillsOffered.map((skill, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <img
                                        src={skill.image || 'https://placehold.co/100x100'}  // Add skill image or placeholder
                                        alt={skill.name || `Skill ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="text-lg font-bold mb-2">
                                        {truncateText(skill.name || `Skill ${index + 1}`, 20)}  {/* Limit to 20 characters */}
                                    </h3>
                                    <p className="text-gray-700">
                                        {truncateText(skill.description || 'No description available.', 50)}  {/* Limit to 50 characters */}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3">
                                <p className="text-gray-500">No skills offered.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section - Profile Picture and Edit Button */}
                <div className="w-1/3 flex flex-col items-center">
                    <img
                        src={profileData.image || 'https://placehold.co/80x80'}
                        alt={`Profile picture of ${profileData.name}`}
                        className="w-20 h-20 rounded-full mb-4"
                    />
                    <span className="font-semibold">{profileData.name}</span>
                    <button
                        className="text-green-600 mt-2"
                        onClick={() => setShowModal(true)}  // Open the modal
                    >
                        Edit profile
                    </button>
                </div>
            </div>

            {/* Profile Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg m-4 w-full max-w-md">  {/* Adjusted modal styles */}
                        {/* Render ProfileEdit component inside the modal */}
                        <ProfileEdit profileData={profileData} setShowModal={setShowModal} /> {/* Pass setShowModal as prop */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileView;
