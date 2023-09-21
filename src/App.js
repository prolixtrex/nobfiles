import Home from './components/Home';
import ImageGallery from './components/images/ImageGallery';
import Videos from './components/videos/Videos';
import Documents from './components/documents/Documents'
import Sidebar from './components/sidebar/Sidebar';
import UploadPage from './components/uploadPage/UploadPage';
import Viewer from './components/viewer/Viewer';
import MissingPage from "./components/missingPage/MissingPage"
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MobileSidebar from './components/mobileSidebar/MobileSidebar';
import Search from './components/common/Search';
import LoginModal from './components/common/login/LoginModal';

function App() {

  return (
    <div className="App">
      <Sidebar />
      <MobileSidebar />
      <div className='hideOnDesktop'>
        <Search />
      </div>
      <LoginModal />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/images" Component={ImageGallery} />
        <Route path="/videos" Component={Videos} />
        <Route path="/documents" Component={Documents} />
        <Route path="/upload" Component={UploadPage} />
        <Route path="/:title" Component={Viewer} />
        <Route path="*" Component={MissingPage} />
      </Routes>
    </div>
  );
}

export default App;
