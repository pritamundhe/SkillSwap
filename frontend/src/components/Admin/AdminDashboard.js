import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-8">
      {/* Admin Profile Section */}
      <div className="flex items-center mt-5 mb-8 border-b border-gray-300 pb-4">
        <img
          src="https://via.placeholder.com/80" // Replace with actual admin image URL
          alt="Admin"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">Pritam Mundhe</h1> {/* Replace with actual admin name */}
          <p className="text-gray-600">pritamundhe@example.com</p> {/* Replace with actual admin email */}
          <p className="text-gray-500 mt-1">Joined on: August 31, 2024</p> {/* Additional info */}
          <p className="text-gray-500">Role: Super Admin</p> {/* Additional info */}
        </div>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-2xl mt-15 font-bold mb-6">Admin Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 mt-13 pb-20 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Management Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
          <h3 className="text-xl font-semibold mb-2">User Management</h3>
          <p className="text-4xl font-bold text-blue-500">150</p> {/* Replace with actual count */}
          <p className="text-gray-600">Active Users</p>
          <p className="text-gray-500">Last Updated: August 30, 2024</p> {/* Additional info */}
          <p className="text-gray-500 mt-2">New Registrations: 20</p> {/* Additional detail */}
          <div className="flex gap-2 mt-4">
            <Link to="/UserManagement">
            <button className="px-4 py-2 bg-blue-500 text-white  text-sm">View Users</button>
            </Link>
            <button className="px-4 py-2 bg-blue-300 text-white  text-sm">Manage Users</button>
          </div>
        </div>

        {/* Skill Management Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
          <h3 className="text-xl font-semibold mb-2">Skill Management</h3>
          <p className="text-4xl font-bold text-green-500">75</p> {/* Replace with actual count */}
          <p className="text-gray-600">Skills Listed</p>
          <p className="text-gray-500">Last Updated: August 28, 2024</p> {/* Additional info */}
          <p className="text-gray-500 mt-2">New Skills: 5</p> {/* Additional detail */}
          <div className="flex gap-2 mt-4">
            <Link to="/SkillManagement">
            <button className="px-4 py-2 bg-green-500 text-white text-sm">View Skills</button>
            </Link>
            <button className="px-4 py-2 bg-green-300 text-white text-sm">Manage Skills</button>
          </div>
        </div>

        {/* Webinar Management Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
          <h3 className="text-xl font-semibold mb-2">Webinar Management</h3>
          <p className="text-4xl font-bold text-purple-500">12</p> {/* Replace with actual count */}
          <p className="text-gray-600">Upcoming Webinars</p>
          <p className="text-gray-500">Last Updated: August 27, 2024</p> {/* Additional info */}
          <p className="text-gray-500 mt-2">Webinars Today: 3</p> {/* Additional detail */}
          <div className="flex gap-2 mt-4">
            <Link to="/WebinarManagement">
            <button className="px-4 py-2 bg-purple-500 text-white text-sm">View Webinars</button>
            </Link>
            <button className="px-4 py-2 bg-purple-300 text-white text-sm">Manage Webinars</button>
          </div>
        </div>

        {/* Reports Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
          <h3 className="text-xl font-semibold mb-2">Reports</h3>
          <p className="text-4xl font-bold text-red-500">24</p> {/* Replace with actual count */}
          <p className="text-gray-600">Pending Reports</p>
          <p className="text-gray-500">Last Updated: August 26, 2024</p> {/* Additional info */}
          <p className="text-gray-500 mt-2">Resolved Reports: 10</p> {/* Additional detail */}
          <div className="flex gap-2 mt-4">
            <Link to="/Reports">
            <button className="px-4 py-2 bg-red-500 text-white text-sm">View Reports</button>
            </Link>
            <button className="px-4 py-2 bg-red-300 text-white text-sm">Manage Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
