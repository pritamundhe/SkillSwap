import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import ProfileView from './components/Profile/ProfileView';

import ResourceUpload from './components/Resources/ResourceUpload';
import ResourceList from './components/Resources/ResourceList';

import ReviewList from './components/Reviews/ReviewList';
import ReviewCard from './components/Reviews/Review';
import ReviewForm from './components/Reviews/ReviewForm';

import AddSkill from './components/Skills/SkillAdd';
import SkillList from './components/Skills/SkillList';
import Signup from './components/Auth/Signup';

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
        
          {/* Render the Home component only on the root path */}
          <Route path="/" element={<Home />} />
          {/* Route for Login and signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          {/*Route for Profile */}
            <Route path="/Profile" element={<ProfileView />} />
          {/* Route for Register */}
          <Route path="/Register" element={<Register/>} />
          {/* Route for Resources */}
          <Route path="/ResourceList" element={<ResourceList />} />
          <Route path="/ResourceUpload" element={<ResourceUpload />} />
          {/* Route for Reviews */}
          <Route path="/ReviewCard" element={<ReviewCard />} />
          <Route path="/ReviewList" element={<ReviewList />} />
          <Route path="/ReviewForm" element={<ReviewForm />} />
          {/* Route for Skills */}
          <Route path="/SkillAdd" element={<AddSkill />} />
          <Route path="/SkillList" element={<SkillList />} />

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
