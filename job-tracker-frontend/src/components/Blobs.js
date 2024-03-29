import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Blobs = () => {
  const useEffect = (() => {}, []);

  const variant = {
    initial: {
      transition: {
        // type: 'spring',
        // stiffness: 100,
        // damping: 100,
        duration: 1,
      },
    },
    animate: {
      scale: [1, 1, 1],
      rotate: [0, randomIntFromInterval(15, 90), 0],
      transition: {
        // type: 'spring',
        // stiffness: 100,
        // damping: 100,
        duration: 20,
        repeat: Infinity,
      },
    },
  };

  return (
    <div id="blobs">
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        variants={variant}
        animate="animate"
        initial="initial">
        <path
          fill="#FF0066"
          d="M26.8,-41.1C36,-35.7,45.8,-30.5,56.3,-21.6C66.7,-12.7,77.8,0.1,79.2,13.5C80.5,27,72.2,41.1,58.9,44.3C45.7,47.4,27.5,39.6,14.7,37.6C2,35.5,-5.3,39.4,-10.6,37.3C-15.9,35.2,-19,27.2,-25,21.2C-31,15.2,-39.9,11.1,-47.1,2.9C-54.3,-5.3,-59.9,-17.6,-55.3,-24.2C-50.6,-30.7,-35.7,-31.5,-24.7,-36.1C-13.8,-40.7,-6.9,-49.2,0.9,-50.7C8.7,-52.1,17.5,-46.5,26.8,-41.1Z"
          transform="translate(100 100)"
        />
      </motion.svg>
      {/* <motion.svg
        variants={variant}
        animate="animate"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M30.7,-29.3C44,-17.4,61.8,-8.7,65.6,3.7C69.3,16.2,59,32.4,45.7,40.8C32.4,49.2,16.2,49.8,0.1,49.7C-16.1,49.6,-32.1,48.9,-42.4,40.5C-52.6,32.1,-57,16.1,-56.5,0.5C-56,-15,-50.5,-30.1,-40.3,-41.9C-30.1,-53.8,-15,-62.4,-3.2,-59.3C8.7,-56.1,17.4,-41.1,30.7,-29.3Z"
          transform="translate(100 100)"
        />
      </motion.svg> */}
      {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M35.7,-50.5C47.3,-55.1,58.6,-47.7,63.8,-37.3C68.9,-26.9,68,-13.4,68.5,0.3C68.9,14,70.8,28,62.1,32.2C53.3,36.5,34,31,21.9,32.1C9.8,33.3,4.9,41,-2.4,45.1C-9.6,49.2,-19.3,49.6,-25.9,45.3C-32.5,41,-36.1,32,-38.3,23.6C-40.5,15.3,-41.3,7.6,-42.3,-0.6C-43.4,-8.8,-44.7,-17.7,-45.1,-30.7C-45.6,-43.7,-45.3,-60.8,-37.6,-58.5C-30,-56.2,-15,-34.6,-1.5,-32C12,-29.4,24,-45.9,35.7,-50.5Z"
          transform="translate(100 100)"
        />
      </svg> */}
      <motion.svg
        variants={variant}
        animate="animate"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M30.4,-44.2C42.4,-45.6,57.4,-43.7,63.4,-35.8C69.3,-27.9,66.2,-13.9,62,-2.4C57.8,9.1,52.5,18.1,42.2,18.5C31.9,18.9,16.6,10.6,8.7,22.4C0.9,34.1,0.4,66,-4,73C-8.5,80,-17,62,-29.1,52.7C-41.2,43.4,-57,42.7,-64.3,35.4C-71.6,28,-70.5,14,-64,3.7C-57.6,-6.6,-45.9,-13.1,-41.7,-25.8C-37.4,-38.5,-40.7,-57.4,-35,-59.7C-29.3,-62,-14.7,-47.7,-2.8,-42.9C9.1,-38.2,18.3,-42.8,30.4,-44.2Z"
          transform="translate(100 100)"
        />
      </motion.svg>
    </div>
  );
};

export default Blobs;
