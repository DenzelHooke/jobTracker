import { useEffect } from 'react';
import { BsEnvelope, BsClock, BsPuzzle } from 'react-icons/bs';
import { motion } from 'framer-motion';

export const Sidebar = ({ currentPage, onSelect }) => {
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

  const onClick = (e) => {
    if (e.target.tagName != 'LI') {
      return;
    }
    console.log(e.target.id);
    onSelect(e.target.id);
  };

  return (
    <div id="sidebar">
      <div className="sidebar-title">
        <h3>JOBS</h3>
      </div>
      <div className="sidebar-options-wrapper">
        <ul className="sidebar-options">
          <motion.li
            {...tags}
            id="applied"
            onClick={(e) => onClick(e)}
            className="sidebar-option">
            <BsEnvelope size={iconSize} className="icon" />
            <span>Applied</span>
          </motion.li>
          <motion.li
            {...tags}
            id="pending"
            onClick={(e) => onClick(e)}
            className="sidebar-option">
            <BsClock size={iconSize} className="icon" />
            <span>Pending</span>
          </motion.li>
          <motion.li
            {...tags}
            id="rejected"
            onClick={(e) => onClick(e)}
            className="sidebar-option">
            <BsPuzzle size={iconSize} className="icon" />
            <span>Rejected</span>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
