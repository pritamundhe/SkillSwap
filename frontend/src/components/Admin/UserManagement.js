import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  // Fetch users from an API or backend when the component mounts
  useEffect(() => {
    // Simulate API call with a timeout
    setTimeout(() => {
      const fetchedUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Inactive' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
        // Add more users as needed
      ];
      setUsers(fetchedUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit functionality here
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
    // Implement delete functionality here
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button 
                    onClick={() => handleEdit(user.id)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="px-4 py-2 bg-red-500 text-white rounded-sm text-sm hover:bg-red-600"
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

export default UserManagement;
