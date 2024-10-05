import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const userData = jwtDecode(token);
    setUser(userData);
    localStorage.setItem('userId',userData._id);
    console.log(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const isAuthenticated = user !== null; // Determine authentication status

  console.log('User:', user); // Check the user object

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
