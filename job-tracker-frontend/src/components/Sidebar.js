import { useEffect } from 'react';
import { BsEnvelope, BsClock, BsPuzzle } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

export const Sidebar = ({ currentPage, onSelect }) => {
  const iconSize = 19;

  const tabs = [
    {
      name: 'applied',
      icon: <BsEnvelope size={iconSize} className="icon" />,
    },
    {
      name: 'pending',
      icon: <BsClock size={iconSize} className="icon" />,
    },
    {
      name: 'rejected',
      icon: <BsPuzzle size={iconSize} className="icon" />,
    },
  ];

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
          {tabs.map((item) => (
            <motion.li
              key={uuidv4()}
              id={item.name}
              onClick={(e) => onClick(e)}
              className={`sidebar-option ${
                currentPage === item.name ? 'active' : ''
              }`}>
              {item.icon}
              <span>{`${item.name[0].toUpperCase()}${item.name.slice(
                1
              )}`}</span>
            </motion.li>
          ))}

          {/* <motion.li
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
          </motion.li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
