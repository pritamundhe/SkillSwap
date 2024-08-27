import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Render the Home component only on the root path */}
          <Route path="/" element={<Home />} />
          {/* Route for Login */}
          <Route path="/login" element={<Login />} />
          {/* Route for Register */}
          <Route path="/signup" element={<Register />} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

