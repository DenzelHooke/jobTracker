import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { renderPDF } from '@/helpers/pdf';

const documentPDF = ({ url, icon, type, setExpandHeight }) => {
  const [isExpand, setIsExpand] = useState(false);

  const dropdownVariant = {
    shrink: {
      maxHeight: '50px',
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

  const initialBG = '#171717';
  const expandVariant = {
    solid: {
      backgroundColor: initialBG,
      color: 'white',
    },
    hover: {
      backgroundColor: [initialBG, '#171717'],
      transition: {
        duration: 2,
        ease: [0.075, 0.82, 0.165, 1],
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  const dropdownTags = {
    initial: 'shrink',
    animate: isExpand ? 'expand' : '',
  };

  const expandBtnTags = {
    initial: 'solid',
    whileHover: 'hover',
  };

  useEffect(() => {
    console.log('HIT ');
    setExpandHeight(isExpand ? '650px' : '426px');
  }, [isExpand]);

  useEffect(() => {
    // renderPDF({ url: url, canvasID: 'resume-canvas' });
  }, [url]);

  const onExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <motion.div
      className="document roundBtn"
      variants={dropdownVariant}
      {...dropdownTags}>
      <div className="head flex">
        <p>{type}</p>
        <motion.button
          className="clickable roundBtn"
          variants={expandVariant}
          {...expandBtnTags}
          onClick={onExpand}>
          Expand
        </motion.button>
      </div>
      <div className="doc">
        {/* <canvas id="resume-canvas"></canvas> */}
        <iframe
          src={`${url ? url : ''}#toolbar=0`}
          alt="Application document image"
          width="100%"
          height="100%"></iframe>
      </div>
    </motion.div>
  );
};

export default documentPDF;
