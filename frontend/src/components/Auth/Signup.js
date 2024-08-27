import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white-500 to-indigo-500">
      <div className="flex w-3/4 max-w-4xl rounded-lg shadow-lg border-2 border-black-500">
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white rounded-l-lg">
          <h2 className="text-2xl font-bold mb-2">Hello, Friend!</h2>
          <p className="mb-6">Sign up to start your journey with us.</p>
          <Link
            to="/login"
            className="block mt-6 py-2 px-4 bg-white text-purple-600 rounded-md text-center hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
        <div className="w-full p-8 lg:w-1/2 bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" className="form-checkbox text-purple-600" />
              <span className="ml-2 text-sm text-gray-600">I agree to the Terms & Conditions</span>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
