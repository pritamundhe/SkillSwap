import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const ProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    workPreference: '',
    projects: '',
    workHistory: '',
    education: '',
    profilePicture: '', // For profile picture URL
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // To redirect after successful submission
  const userId = user ? user._id : localStorage.getItem('userId'); // Get user ID from context or localStorage

  // Handler function to update state for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handler for uploading profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: response.data.url,
        }));
        setSuccess('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image. Please try again.');
      }
    }
  };

  // Form submit handler (same structure as ResourceUpload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.put(
        `http://localhost:5000/users/profile`,
 
        { userId, ...profile
        
        }
      );

      if (response.status === 200) {
        console.log('Profile updated:', response.data);
        setSuccess('Profile updated successfully!');
        // Redirect to profile page after successful update
        navigate('/Profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile. Please try again.');
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/users/profile/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setError('Error fetching profile. Please try again.');
        }
      }
    };

    fetchProfile();
  }, [userId]);

    return (
        <div className="p-6 shadow-md max-w-7xl mx-auto bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Edit Form */}
                <div className="flex flex-col lg:w-full bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4 text-purple-700">Edit Profile</h2>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center">
                            <img
                                className="w-24 h-24 rounded-full object-cover mr-4 border-2 border-purple-500"
                                src={profile.profilePicture || 'https://via.placeholder.com/64'}
                                alt="Profile"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-700 cursor-pointer"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name Field */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Work Preference Field */}
                            <div className="mb-4">
                                <label htmlFor="workPreference" className="block text-gray-700 font-medium">Work Preference</label>
                                <input
                                    id="workPreference"
                                    name="workPreference"
                                    type="text"
                                    value={profile.workPreference}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Projects Field */}
                            <div className="mb-4 col-span-2">
                                <label htmlFor="projects" className="block text-gray-700 font-medium">Projects</label>
                                <textarea
                                    id="projects"
                                    name="projects"
                                    rows="3"
                                    value={profile.projects}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>

                            {/* Work History Field */}
                            <div className="mb-4 col-span-2">
                                <label htmlFor="workHistory" className="block text-gray-700 font-medium">Work History</label>
                                <textarea
                                    id="workHistory"
                                    name="workHistory"
                                    rows="3"
                                    value={profile.workHistory}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>

                            {/* Education Field */}
                            <div className="mb-4 col-span-2">
                                <label htmlFor="education" className="block text-gray-700 font-medium">Education</label>
                                <textarea
                                    id="education"
                                    name="education"
                                    rows="3"
                                    value={profile.education}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-700"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
