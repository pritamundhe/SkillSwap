import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';
import ProfileView from './components/Profile/ProfileView';
import ProfileEdit from './components/Profile/ProfileEdit';
import ChatApp from './components/Messaging/ChatApp';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserManagement from './components/Admin/UserManagement';
import WebinarManagement from './components/Admin/WebinarManagement';
import SkillManagement from './components/Admin/SkillManagement';
import Reports from './components/Admin/Reports';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/ProfileEdit" element={<ProfileEdit />} />
          <Route path='/ChatApp' element={<ChatApp/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/UserManagement' element={<UserManagement/>}/>
          <Route path='/WebinarManagement' element={<WebinarManagement/>}/>
          <Route path='/SkillManagement' element={<SkillManagement/>}/>
          <Route path='/Reports' element={<Reports/>}/>



          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
