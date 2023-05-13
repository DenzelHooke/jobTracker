import { ToastContainer } from 'react-toastify';
import NotifyWatcher from './NotifyWatcher';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <NotifyWatcher />
      <div id="layout" className="relative">
        {children}
      </div>
    </>
  );
};

export default Layout;
