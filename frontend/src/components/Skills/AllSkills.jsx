import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import AllSkillCard from './AllSkillCard';

const NewSkillList = () => {
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleSkills, setVisibleSkills] = useState(10); // Track number of visible skills

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/skill/getSkills`);
        setSkills(response.data);
        setFilteredSkills(response.data);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [userId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredSkills(skills);
    } else {
      const filtered = skills.filter((skill) => skill.category === category);
      setFilteredSkills(filtered);
    }
    setVisibleSkills(20); // Reset visible skills when changing category
  };

  const loadMoreSkills = () => {
    setVisibleSkills((prev) => prev + 20); // Increase the number of visible skills
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-blue-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-start text-purple-950 mb-10">Skills</h2>

        {/* Sorting Bar */}
        <div className="mb-6">
          <div className="flex justify-start space-x-4">
            {['All', 'Technical', 'Creative', 'Business', 'Personal Development', 'Other'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out
                  ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-white text-purple-950 border border-purple-950'}
                  hover:bg-purple-600 hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredSkills.slice(0, visibleSkills).map((skill, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl transform transition-transform hover:scale-105"
                style={{ height: 'auto' }}
              >
                <AllSkillCard key={index} skill={skill} userId={userId} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No skills found for the selected category.</p>
        )}

        {/* Load More Button */}
        {filteredSkills.length > visibleSkills && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreSkills}
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSkillList;
