import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({ setShowModal }) => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    pronouns: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const userId = user ? user._id : localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('bio', profile.bio);
    formData.append('pronouns', profile.pronouns);
    if (file) {
      formData.append('image', file);
    }
    console.log(file.path)
    try {
      const response = await axios.put(
        `http://localhost:5000/users/profile/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
        }
      );

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
        navigate('/Profile');
        setShowModal(false);
      }
    } catch (error) {
      setError('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/Profile');
  };

  const handleUpdateClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleRemoveClick = () => {
    setFile(null);
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: '',
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/users/profile/${userId}`, {
           
          });
          setProfile(response.data);
        } catch (error) {
          setError('Error fetching profile. Please try again.');
        }
      }
    };
    fetchProfile();

    // Clean up the object URL to prevent memory leaks
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [userId, file]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-auto">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <i className="fas fa-times text-gray-500 cursor-pointer" onClick={handleCancel}></i>
        </div>

        <div className="flex items-center mb-4">
          <img
            alt="Profile"
            className="w-14 h-14 rounded-full"
            src={file ? URL.createObjectURL(file) : profile.image || 'https://via.placeholder.com/64'}
          />
          <div className="ml-4">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="text-green-600"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                type="button"
                className="text-red-600"
                onClick={handleRemoveClick}
              >
                Remove
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name*</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Pronouns</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Add..."
              name="pronouns"
              value={profile.pronouns}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Short bio</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 h-20"
              placeholder="Tell something about yourself"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="text-green-600 border border-green-600 rounded-lg px-4 py-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
