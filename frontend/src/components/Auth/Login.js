import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });
  
      const { success, message, jwtToken, eami, name } = response.data; 
      console.log(response.data)
      if (success) {

 
        const userData = jwtDecode(jwtToken);
        console.log('User logged in:', userData);
  
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('name', name);
        localStorage.setItem('eamil',eami);
  
        login(jwtToken); 
  
        navigate('/Profile');
      } else {
        setError(message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response ? err.response.data.message : 'Something went wrong!');
    }
  };

  return (
    <div className="flex mt-10 items-center justify-center bg-gradient-to-r from-white-500 to-indigo-500">
      <div className="flex w-3/4 max-w-4xl rounded-lg shadow-lg border-2">
        <div className="w-full p-8 lg:w-1/2 bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">Hello!</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create
            </Link>
          </p>
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white rounded-r-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="mb-6">Login to access your account and explore the platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
