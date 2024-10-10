import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    level: 'Beginner',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const uploadedBy = localStorage.getItem('userId');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('level', formData.level);
      data.append('file', file);
      data.append('addedBy', uploadedBy);

      const response = await axios.post('http://localhost:5000/skill/addSkill', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Resource uploaded successfully!');
      setFormData({
        name: '',
        description: '',
        category: 'Other',
        level: 'Beginner',
      });
      setFile(null);
      navigate('/newSkillList');
    } catch (err) {
      setError('Failed to upload resource');
    }
  };

  const { name, description, category, level } = formData;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Skill</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Resource Title */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Skill Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            placeholder="Enter the resource title"
            required
          />
        </div>

        {/* Resource Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Skill Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            placeholder="Provide a brief description"
            rows="4"
            required
          />
        </div>

        {/* Upload File */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          >
            <option value="Skill">Skill</option>
            <option value="Webinar">Webinar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Access Level */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
            Level
          </label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Resource
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
