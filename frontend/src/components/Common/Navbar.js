import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [showLogout, setShowLogout] = useState(false); // State for showing/hiding logout button

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the homepage
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout); // Toggle the visibility of the logout button
  };

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle error appropriately (optional)
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  return (
    <nav className="bg-white shadow-md border border-gray-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          SkillSwap
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center items-center">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
            <li><Link to="/AllSkills" className="text-gray-600 hover:text-purple-600">Skills</Link></li>
            <li><Link to="/webinar" className="text-gray-600 hover:text-purple-600">Webinar</Link></li>
            <li><Link to="/Chatbot" className="text-gray-600 hover:text-purple-600">Messages</Link></li>
          </ul>
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-purple-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Auth Links / User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <img 
                src={profileData?.image || 'https://via.placeholder.com/150'} // Fallback image
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => navigate('/Profile')}
              />
              <span className="text-gray-600 cursor-pointer" onClick={toggleLogout}>
                {user?.name || 'User'}
              </span>
              {showLogout && ( // Conditionally render the logout button
                <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 px-4 py-1.5">
                  Logout
                </button>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Log In</Link>
              <Link to="/signup">
                <button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 p-4">
            <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
            <li><Link to="/freebie" className="text-gray-600 hover:text-purple-600">Freebie</Link></li>
            <li><Link to="/AdminDashboard" className="text-gray-600 hover:text-purple-600">Admin</Link></li>
            <li><Link to="/ChatApp" className="text-gray-600 hover:text-purple-600">Messages</Link></li>
            {user ? (
              <li className="flex items-center space-x-2">
                <img 
                  src={profileData?.image || 'https://via.placeholder.com/150'} // Fallback image
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onClick={() => navigate('/Profile')}
                />
                <span className="text-gray-600 cursor-pointer" onClick={toggleLogout}>
                  {user?.name || 'User'}
                </span>
                {showLogout && (
                  <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 px-4 py-1.5">Logout</button>
                )}
              </li>
            ) : (
              <>
                <li><Link to="/login" className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Log In</Link></li>
                <li><Link to="/signup"><button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Signup</button></Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
