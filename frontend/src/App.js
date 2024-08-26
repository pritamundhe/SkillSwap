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
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
      
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
