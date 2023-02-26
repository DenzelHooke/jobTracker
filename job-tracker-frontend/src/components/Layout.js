import { ToastContainer } from 'react-toastify';
import NotifyWatcher from './notifyWatcher';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <NotifyWatcher />
      <div id="layout">{children}</div>
    </>
  );
};

export default Layout;
