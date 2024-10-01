import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the path based on your folder structure
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileView = () => {
    const { user } = useContext(AuthContext); // Get the user from AuthContext
    const [profileData, setProfileData] = useState(null);
    const userId = user ? user._id : null; // Assuming the user object has an _id property
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/profile/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (userId) {
            fetchProfileData();
        }
    }, [userId]);

    // Check if profileData is defined
    if (!profileData) {
        return <div className="text-center">Loading...</div>; // You can customize this loading message
    }

    return (
        <div className="p-6 rounded-lg shadow-md max-w-7xl mx-auto flex flex-col gap-6 bg-purple-100 lg:flex-row">
            {/* Profile Details */}
            <div className="flex flex-col lg:w-1/3 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Profile Details</h2>
                <img
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    src={profileData.profilePic?.data ? `data:${profileData.profilePic.contentType};base64,${profileData.profilePic.data.toString('base64')}` : 'https://via.placeholder.com/128'}
                    alt={`Profile picture of ${profileData.name}`}
                />
                <div className="text-center">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-gray-600 mb-4">{profileData.email}</p>
                    <button className="mt-4 text-white bg-purple-600 border-2 border-purple-600 px-4 py-2 text-lg hover:bg-white hover:text-purple-600 transition duration-300">
                        Share profile link
                    </button>
                </div>
            </div>

            {/* Experience and Other Sections */}
            <div className="bg-white p-6 rounded-lg shadow-md lg:flex-grow">
                {/* Experience Section */}
                <h3 className="text-2xl font-bold mb-4">Experience</h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Projects Section */}
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Projects</h4>
                        <p className="text-sm text-gray-500 py-2">
                            Showcase your skills to recruiters with job-relevant projects. Add projects here to demonstrate your technical expertise and ability to solve real-world problems.
                        </p>
                        <button className="text-sm text-blue-700 font-semibold">Browse Projects</button>
                    </div>

                    {/* Work History Section */}
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Work History</h4>
                        <p className="text-sm text-gray-500 py-2">
                            Add your past work experience here. If you're just starting out, you can add internships or volunteer experience instead.
                        </p>
                        <button
                            className="text-sm text-purple-600 font-semibold border-2 rounded-lg border-purple-600 hover:bg-purple-600 hover:text-white px-4 py-1 transition duration-300"
                            onClick={() => navigate('/ProfileEdit')} // Navigate to ProfileEdit.js
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Education</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Credentials</h4>
                        <p className="text-sm text-gray-500 py-2">Get job-ready with role-based training from industry-leading companies.</p>
                        <h4 className="font-medium">Skills Offered</h4>
                        <p className="text-gray-600 py-4">
                            {profileData.skillsOffered && profileData.skillsOffered.length > 0 ? profileData.skillsOffered.join(', ') : 'No skills offered.'}
                        </p>
                    </div>
                </div>

                {/* Matches Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Matches</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Matched Users</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.matches && profileData.matches.length > 0 ? profileData.matches.join(', ') : 'No matches found.'}
                        </p>
                    </div>
                </div>

                {/* Messages Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Messages</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Your Messages</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.messages && profileData.messages.length > 0 ? profileData.messages.join(', ') : 'No messages available.'}
                        </p>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Your Reviews</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.reviews && profileData.reviews.length > 0 ? profileData.reviews.join(', ') : 'No reviews available.'}
                        </p>
                    </div>
                </div>

                {/* Webinars Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Webinars</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Webinars Organized</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.webinarsOrganized && profileData.webinarsOrganized.length > 0 ? profileData.webinarsOrganized.join(', ') : 'No webinars organized.'}
                        </p>
                        <h4 className="text-gray-600 font-semibold">Webinars Registered</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.webinarsRegistered && profileData.webinarsRegistered.length > 0 ? profileData.webinarsRegistered.join(', ') : 'No webinars registered.'}
                        </p>
                    </div>
                </div>

                {/* Resources Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Resources</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <h4 className="text-gray-600 font-semibold">Uploaded Resources</h4>
                        <p className="text-sm text-gray-500 py-2">
                            {profileData.resources && profileData.resources.length > 0 ? profileData.resources.join(', ') : 'No resources uploaded.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
