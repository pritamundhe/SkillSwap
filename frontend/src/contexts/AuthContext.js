// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user info from API or localStorage
    // Example:
    // const fetchUser = async () => {
    //   const response = await fetch('/api/current_user');
    //   const data = await response.json();
    //   setUser(data);
    //   setIsAuthenticated(true);
    // };
    // fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
