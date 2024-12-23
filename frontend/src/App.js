import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';
import ProfileView from './components/Profile/ProfileView';

import ResourceUpload from './components/Resources/ResourceUpload';

import ResourceList from './components/Resources/Resource';
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
import { AuthProvider } from './contexts/AuthContext';
import ResourcePage from './pages/ResourcePage';
import NewSkillCard from './components/Skills/NewSkillCard';
import NewSkillList from './components/Skills/NewSkillList';
import AllSkills from './components/Skills/AllSkills';
import Pricing from './components/Common/Pricing';
import SkillPage from './components/Skills/SkillPage'
import WebinarPage from './components/Webinars/WebinarPage';
import Joinwebinar from './components/Webinars/Webinar';
import CreateWebinar from './components/Webinars/CreateWebinar';
import ChatBot from './components/Messaging/ChatBot';
import SWebinar from './components/Webinars/SWebinar';
import CollectionList from './Collection/CollectionList';
import ScheduledWebinars from './components/Webinars/ScheduledWebinar';
import ScheduledWebinarDetails from './components/Webinars/ScheduledWebinarDetails';
import AboutUs from './components/Common/AboutUs';
import ContactUs from './components/Common/ContactUs';
import TermsOfUse from './components/Common/TermsofUse';
import PrivacyPolicy from './components/Common/PrivacyPolicy';


function App() {
  return (
    <div className="App">
      <AuthProvider>
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
          <Route path="/ResourceUpload/:skillId" element={<ResourceUpload />} />
          {/* Route for Reviews */}
          <Route path="/ReviewCard" element={<ReviewCard />} />
          <Route path="/ReviewList" element={<ReviewList />} />
          <Route path="/ReviewForm" element={<ReviewForm />} />
          {/* Route for Skills */}
          <Route path="/SkillAdd" element={<AddSkill />} />
          <Route path="/SkillList" element={<SkillList />} />
          <Route path="/NewSKillCard" element={<NewSkillCard />} />
          <Route path="/NewSKillList" element={<NewSkillList />} />
          <Route path="/AllSkills" element={<AllSkills />} />
          <Route path="/webinar" element={<WebinarPage/>} />
          <Route path='/createwebinar' element={<CreateWebinar/>} />
          <Route path="/join" element={<Joinwebinar/>} />
          <Route path='/Chatbot' element={<ChatBot/>} />
          <Route path="/webinar/:id" element={<SWebinar />} />
          <Route path="/collection" element={<CollectionList/>} />
          <Route path="/ProfileEdit" element={<ProfileEdit />} />
          <Route path='/ChatApp' element={<ChatApp/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/UserManagement' element={<UserManagement/>}/>
          <Route path='/WebinarManagement' element={<WebinarManagement/>}/>
          <Route path='/SkillManagement' element={<SkillManagement/>}/>
          <Route path='/Reports' element={<Reports/>}/>
          <Route path='/ProfileEdit' element={<ProfileEdit/>}/>
          <Route path="/ScheduledWebinars" element={<ScheduledWebinars/>} />
          <Route path='/ResourcePage/:resourceId' element={<ResourcePage/>}/>
          {/* <Route path='/ResourceList' element={<ResourceList/>}/> */}
          <Route path='/Pricing' element={<Pricing />}/>
          <Route path="/skill/:skillId" element={<SkillPage />} />
          <Route path="/scheduled-webinar/:id" element={<ScheduledWebinarDetails />} /> 
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs/>} /> 
          <Route path='/TermsOfUse' element={<TermsOfUse/>} /> 
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>} /> 
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
