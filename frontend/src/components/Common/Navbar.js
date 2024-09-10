import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">SkillSwap</div>
        <ul className="hidden md:flex space-x-8">
          <li><a href="#" className="text-gray-600 hover:text-purple-600">Courses</a></li>
          <li><a href="#" className="text-gray-600 hover:text-purple-600">Freebie</a></li>
          <li><a href="#" className="text-gray-600 hover:text-purple-600">Pricing</a></li>
          <li><a href="#" className="text-gray-600 hover:text-purple-600">Contacts</a></li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="text-white hover:text-purple-600 px-4 py-2 bg-purple-600 rounded-md">Log In</Link>
          <Link to="/signup">
            <button className="bg-purple-600 text-white px-4 py-1.5 rounded-md">Register</button>
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
