import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    accessLevel: 'public', // Default access level
  });
  const { skillId } = useParams(); // Retrieve skillId from URL params
  console.log(skillId)
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const uploadedBy = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('accessLevel', formData.accessLevel);
      data.append('file', file); // Add file data
      data.append('uploadedBy', uploadedBy); // Add user ID

      // Validate if skillId is present in the URL
      if (!skillId) {
        setError('No skillId found in the URL.');
        return;
      }

      // Send data to the backend
      const response = await axios.post(`http://localhost:5000/resource/upload/${skillId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resource uploaded:', response.data);
      setSuccess('Resource uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        accessLevel: 'public',
      });
      setFile(null); // Clear file input
      navigate('/ResourceList'); // Redirect to resource list after successful upload
    } catch (err) {
      setError('Failed to upload resource');
      console.log(err);
    }
  };

  const { title, description, accessLevel } = formData;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload a Resource</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Resource Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter resource title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Resource Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter resource description"
            required
          />
        </div>

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Access Level */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessLevel">
            Access Level
          </label>
          <select
            id="accessLevel"
            name="accessLevel"
            value={accessLevel}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceUpload;
