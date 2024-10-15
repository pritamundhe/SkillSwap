import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]); // State to hold available skills
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const userId = user ? user._id : localStorage.getItem('userId');

  // Handler function to update state for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (file) {
      formData.append('image', file); // Add the file to form data
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/users/profile/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
          },
        }
      );

      if (response.status === 200) {
        console.log('Profile updated:', response.data);
        setSuccess('Profile updated successfully!');
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

  // Fetch skills on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skills'); // Adjust endpoint as necessary
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Error fetching skills. Please try again.');
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="p-6 shadow-md max-w-7xl mx-auto bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col lg:w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-purple-700">Edit Profile</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center">
              <img
                className="w-24 h-24 rounded-full object-cover mr-4 border-2 border-purple-500"
                src={profile.image || 'https://via.placeholder.com/64'}
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
