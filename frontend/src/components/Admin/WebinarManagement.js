import React, { useState, useEffect } from 'react';

const WebinarManagement = () => {
  // State to hold the list of webinars
  const [webinars, setWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch webinars from an API or backend when the component mounts
  useEffect(() => {
    // Simulate API call with a timeout
    setTimeout(() => {
      const fetchedWebinars = [
        { id: 1, title: 'React Basics', date: '2024-09-01', status: 'Upcoming', participants: 30 },
        { id: 2, title: 'Advanced Node.js', date: '2024-09-05', status: 'Upcoming', participants: 45 },
        { id: 3, title: 'Intro to MongoDB', date: '2024-08-29', status: 'Completed', participants: 50 },
        // Add more webinars as needed
      ];
      setWebinars(fetchedWebinars);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (webinarId) => {
    console.log(`Edit webinar with ID: ${webinarId}`);
    // Implement edit functionality here
  };

  const handleDelete = (webinarId) => {
    console.log(`Delete webinar with ID: ${webinarId}`);
    // Implement delete functionality here
    const updatedWebinars = webinars.filter(webinar => webinar.id !== webinarId);
    setWebinars(updatedWebinars);
  };

  if (isLoading) {
    return <div>Loading webinars...</div>;
  }

  if (error) {
    return <div>Error loading webinars: {error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Webinar Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {webinars.map(webinar => (
              <tr key={webinar.id} className="hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{webinar.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{webinar.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{webinar.date}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${webinar.status === 'Upcoming' ? 'text-blue-600' : 'text-gray-600'}`}>{webinar.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{webinar.participants}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button 
                    onClick={() => handleEdit(webinar.id)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(webinar.id)} 
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebinarManagement;
