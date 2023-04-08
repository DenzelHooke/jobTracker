import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const documentPDF = ({ url, icon, type, setExpandHeight }) => {
  const resumeURL = url;
  const [isExpand, setIsExpand] = useState(false);

  const dropdownVariant = {
    shrink: {
      maxHeight: '40px',
    },
    expand: {
      maxHeight: '300px',
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 40,
      },
    },
  };

  const dropdownTags = {
    initial: 'shrink',
    animate: isExpand ? 'expand' : '',
  };

  useEffect(() => {
    console.log('HIT ');
    setExpandHeight(isExpand ? '650px' : '426px');
  }, [isExpand]);

  const onExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <motion.div
      className="document roundBtn"
      variants={dropdownVariant}
      {...dropdownTags}>
      <div className="head flex">
        <p>Resume</p>
        <button className="clickable roundBtn" onClick={onExpand}>
          Expand
        </button>
      </div>
      <embed
        src={resumeURL ? resumeURL : ''}
        alt="Resume image"
        width="300px"
        height={300}
      />
    </motion.div>
  );
};

export default documentPDF;
