import { BsEnvelope, BsClock, BsPuzzle } from 'react-icons/bs';
import { motion } from 'framer-motion';

export const Sidebar = ({ pageData }) => {
  const iconSize = 19;

  const tags = {
    // animate: {},
    // initial: {
    //   backgroundColor: 'white',
    //   opacity: 100,
    //   scale: 1,
    // },
    // transition: {
    //   type: 'spring',
    //   // delay: 0.1,
    //   duration: 1,
    // },
    // whileHover: {
    //   backgroundColor: 'red',
    // },
  };

  return (
    <div id="sidebar">
      <div className="sidebar-title">
        <h3>JOBS</h3>
      </div>
      <div className="sidebar-options-wrapper">
        <ul className="sidebar-options">
          <motion.li {...tags} className="sidebar-option">
            <BsEnvelope size={iconSize} className="icon" />
            <span>Applied</span>
          </motion.li>
          <motion.li {...tags} className="sidebar-option">
            <BsClock size={iconSize} className="icon" />
            <span>Pending</span>
          </motion.li>
          <motion.li {...tags} className="sidebar-option">
            <BsPuzzle size={iconSize} className="icon" />
            <span>Rejected</span>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
