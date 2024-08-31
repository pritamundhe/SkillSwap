import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the path based on your folder structure


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext); // Assuming you have AuthContext to provide auth state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md border border-d-gray-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          SkillSwap
        </Link>
        <ul className={`md:flex space-x-8 ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
          <li><Link to="/freebie" className="text-gray-600 hover:text-purple-600">Freebie</Link></li>
          <li><Link to="/pricing" className="text-gray-600 hover:text-purple-600">Pricing</Link></li>
          <li><Link to="/contacts" className="text-gray-600 hover:text-purple-600">Contacts</Link></li>
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
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
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{user.name}</span> {/* Display user's name */}
              <img 
                src={user.profilePicture} // Ensure `profilePicture` URL is available in user object
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-purple-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 p-4">
            <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
            <li><Link to="/freebie" className="text-gray-600 hover:text-purple-600">Freebie</Link></li>
            <li><Link to="/pricing" className="text-gray-600 hover:text-purple-600">Pricing</Link></li>
            <li><Link to="/contacts" className="text-gray-600 hover:text-purple-600">Contacts</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/login" className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Log In</Link></li>
                <li><Link to="/signup"><button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Signup</button></Link></li>
              </>
            ) : (
              <li className="flex items-center space-x-2">
                <span className="text-gray-600">{user.name}</span> {/* Display user's name */}
                <img 
                  src={user.profilePicture} // Ensure `profilePicture` URL is available in user object
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
