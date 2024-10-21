import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    accessLevel: 'public',
  });
  const [pdfData, setPdfData] = useState({ title: '' });
  const { skillId } = useParams();
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
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

  const handlePdfChange = (e) => {
    const { name, value } = e.target;
    setPdfData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const uploadedBy = localStorage.getItem('userId');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('accessLevel', formData.accessLevel);
      data.append('file', file);
      data.append('uploadedBy', uploadedBy);

      if (!skillId) {
        setError('No skillId found in the URL.');
        return;
      }

      const response = await axios.post(`http://localhost:5000/resource/upload/${skillId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Resource uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        accessLevel: 'public',
      });
      setFile(null);
      navigate('/ResourceList');
    } catch (err) {
      setError('Failed to upload resource');
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const uploadedBy = localStorage.getItem('userId');

    try {
      const data = new FormData();
      data.append('title', pdfData.title);
      data.append('file', pdfFile);
      data.append('uploadedBy', uploadedBy);

      const response = await axios.post(`http://localhost:5000/resource/upload/pdf/${skillId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('PDF uploaded successfully!');
      setPdfData({ title: '' });
      setPdfFile(null);
    } catch (err) {
      setError('Failed to upload PDF');
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Upload Resource or PDF</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resource Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Upload a Resource</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Resource Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="h-12 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3"
                placeholder="Enter resource title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3"
                placeholder="Enter resource description"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Access Level</label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Resource
            </button>
          </form>

          {/* PDF Upload Form */}
          <form onSubmit={handlePdfSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Upload a PDF</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">PDF Title</label>
              <input
                type="text"
                name="title"
                value={pdfData.title}
                onChange={handlePdfChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-4 py-3"
                placeholder="Enter PDF title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
              <input
                type="file"
                onChange={handlePdfFileChange}
                accept="application/pdf"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Upload PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceUpload;
