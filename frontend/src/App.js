import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';
import ProfileView from './components/Profile/ProfileView';
import ResourceUpload from './components/Resources/ResourceUpload';
import ResourceList from './components/Resources/ResourceList';

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
            {/*Route for Profile */}
            <Route path="/Profile" element={<ProfileView />} />
          {/* Route for Register */}
          <Route path="/Register" element={<Register/>} />
          {/* Route for Resources */}
          <Route path="/ResourceList" element={<ResourceList />} />
          <Route path="/ResourceUpload" element={<ResourceUpload />} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

