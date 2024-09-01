import React, { useState, useEffect } from 'react';

const SkillManagement = () => {
  // State to hold the list of skills
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from an API or backend when the component mounts
  useEffect(() => {
    // Simulate API call with a timeout
    setTimeout(() => {
      const fetchedSkills = [
        { id: 1, name: 'JavaScript', category: 'Programming', level: 'Intermediate' },
        { id: 2, name: 'React', category: 'Frontend Development', level: 'Advanced' },
        { id: 3, name: 'Node.js', category: 'Backend Development', level: 'Advanced' },
        // Add more skills as needed
      ];
      setSkills(fetchedSkills);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (skillId) => {
    console.log(`Edit skill with ID: ${skillId}`);
    // Implement edit functionality here
  };

  const handleDelete = (skillId) => {
    console.log(`Delete skill with ID: ${skillId}`);
    // Implement delete functionality here
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    setSkills(updatedSkills);
  };

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  if (error) {
    return <div>Error loading skills: {error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Skill Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {skills.map(skill => (
              <tr key={skill.id} className="hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{skill.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{skill.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{skill.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{skill.level}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button 
                    onClick={() => handleEdit(skill.id)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id)} 
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

export default SkillManagement;
