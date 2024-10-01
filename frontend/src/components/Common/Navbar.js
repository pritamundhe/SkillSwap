import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the path based on your folder structure
import ProfileView from '../Profile/ProfileView';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Use AuthContext
  const [showLogout, setShowLogout] = useState(false); // State to control the visibility of the logout button
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogoutButton = () => {
    setShowLogout(!showLogout); // Toggle the logout button visibility
  };

  const handleLogout = () => {
    logout(); // Call the logout function to update the auth state
    setShowLogout(false); // Hide the logout button after logging out
    navigate('/'); // Redirect to the homepage
  };

  return (
    <nav className="bg-white shadow-md border border-d-gray-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          SkillSwap
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center items-center">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
            <li><Link to="/freebie" className="text-gray-600 hover:text-purple-600">Freebie</Link></li>
            <li><Link to="/AdminDashboard" className="text-gray-600 hover:text-purple-600">Admin</Link></li>
            <li><Link to="/ChatApp" className="text-gray-600 hover:text-purple-600">Messages</Link></li>
          </ul>
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-purple-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Auth Links / User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? ( // Check if user is authenticated
            <div className="flex items-center space-x-2">
              
              <img 
                src={user?.profilePicture || 'https://via.placeholder.com/150'} // Dummy profile picture URL
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => navigate('/ProfileView')} // Navigate to Profile page on click
              />
              <span 
                className="text-gray-600 cursor-pointer" 
                
              >
                {user?.email || 'User'}
              </span>
              {showLogout && ( // Show logout button if showLogout is true
                <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 px-4 py-1.5">
                  Logout
                </button>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">
                Log In
              </Link>
              <Link to="/signup">
                <button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">
                  Signup
                </button>
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
                  src={user?.profilePicture || 'https://via.placeholder.com/150'} // Dummy profile picture URL
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onClick={() => navigate('/Profile')} // Navigate to Profile page on click
                />
                <span 
                  className="text-gray-600 cursor-pointer" 
                  onClick={toggleLogoutButton}
                >
                  {user?.name || 'User'}
                </span>
                {showLogout && (
                  <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 px-4 py-1.5">
                    Logout
                  </button>
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
