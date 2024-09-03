import { useContext, useEffect } from 'react';
import { DataContext } from './dataContext/DataContext';
import Home from './components/home/Home';
import ImageGallery from './components/images/ImageGallery';
import Videos from './components/videos/Videos';
import Documents from './components/documents/Documents'
import Sidebar from './components/sidebar/Sidebar';
import UploadPage from './components/common/uploadPage/UploadPage';
import Viewer from './components/viewer/Viewer';
import MissingPage from "./components/missingPage/MissingPage";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import MobileSidebar from './components/mobileSidebar/MobileSidebar';
import Search from './components/common/search/Search';
import Login from './components/common/account/Login';
import Signup from './components/common/account/Signup';
import ProfilePage from './components/profilePage/ProfilePage';
import ResetPassword from './components/common/account/ResetPassword';
import ForgotPassword from './components/common/account/ForgotPassword';

function App() {
  const { loggedIn } = useContext(DataContext)
  const navigate = useNavigate()
  const location = useLocation()
  const baseURL = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    if (!loggedIn && baseURL !== "https://nobfiles.netlify.app/resetPassword") {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      {loggedIn &&
        <>
          <Sidebar />
          <MobileSidebar />
          <div className='hideOnDesktop'>
            <Search />
          </div>
        </>
      }
      <Routes>
        <Route path="/" element={!loggedIn ? <Login /> : <Home />} />
        <Route path="/images" Component={ImageGallery} />
        <Route path="/videos" Component={Videos} />
        <Route path="/documents" Component={Documents} />
        <Route path="/upload" Component={UploadPage} />
        <Route path="/:title" Component={Viewer} />
        <Route path="/signup" Component={Signup} />
        <Route path="/forgotPassword" Component={ForgotPassword} />
        <Route path='/profilePage' Component={ProfilePage} />
        <Route path='/resetPassword' Component={ResetPassword} />
        <Route path="*" Component={MissingPage} />
      </Routes>
    </div>
  );
}

export default App;
