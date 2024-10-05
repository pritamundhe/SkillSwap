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
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-6 rounded-lg shadow-md max-w-6xl mx-auto flex flex-col gap-6 bg-purple-100 lg:flex-row">
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
                    <p className="text-gray-600 mb-4 font-medium">Role: {profileData.role}</p>
                    <button
                        className="mt-4 text-white bg-purple-600 border-2 border-purple-600 px-4 py-2 text-lg hover:bg-white hover:text-purple-600 transition duration-300"
                        onClick={() => navigate('/ProfileEdit')}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Skills and Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md lg:flex-grow">
                {/* Skills Offered Section */}
                <h3 className="text-2xl font-bold mb-4">Skills Offered</h3>
                <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                    <p className="text-gray-600 py-4">
                        {profileData.skillsOffered && profileData.skillsOffered.length > 0
                            ? profileData.skillsOffered.join(', ')
                            : 'No skills offered.'}
                    </p>
                </div>

                {/* Reviews Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <p className="text-gray-600 py-2">
                            {profileData.reviews && profileData.reviews.length > 0
                                ? profileData.reviews.join(', ')
                                : 'No reviews available.'}
                        </p>
                    </div>
                </div>

                {/* Account Information */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Account Information</h3>
                    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">
                            <strong>Created At:</strong> {new Date(profileData.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <strong>Updated At:</strong> {new Date(profileData.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
