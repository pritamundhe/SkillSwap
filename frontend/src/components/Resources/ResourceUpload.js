import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResourceUpload = () => {
  // State to hold form data and file input
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    linkedTo: 'Skill',    // Default option for linkedTo
    webinar: '',          // Will only be used if linkedTo is 'Webinar'
    accessLevel: 'public' // Default access level
  });
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

    const uploadedBy = localStorage.getItem('userId');

    try {
      // Create a FormData object to handle file uploads
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('linkedTo', formData.linkedTo);
      data.append('accessLevel', formData.accessLevel);
      if (formData.linkedTo === 'Webinar') {
        data.append('webinar', formData.webinar); // Only append webinar if linkedTo is Webinar
      }
      data.append('file', file); // Add file data
      data.append('uploadedBy', uploadedBy);

      const response = await axios.post('http://localhost:5000/resource/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set correct header for file uploads
        },
      });

      console.log('Resource uploaded:', response.data);
      setSuccess('Resource uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        linkedTo: 'Skill',
        webinar: '',
        accessLevel: 'public',
      }); // Clear form fields
      setFile(null); // Clear file input
      navigate('/ResourceList');
    } catch (err) {
      setError('Failed to upload resource');
      console.log(err);
    }
  };

  const { title, description, linkedTo, webinar, accessLevel } = formData;

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

        {/* Linked To */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedTo">
            Linked To
          </label>
          <select
            id="linkedTo"
            name="linkedTo"
            value={linkedTo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Skill">Skill</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        {/* Webinar Selection (only show if linkedTo is Webinar) */}
        {linkedTo === 'Webinar' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="webinar">
              Select Webinar
            </label>
            <input
              type="text"
              id="webinar"
              name="webinar"
              value={webinar}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter webinar ID"
              required={linkedTo === 'Webinar'}
            />
          </div>
        )}

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
