import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const InformItem = ({ title, icon, bgColor, body }) => {
  const iconRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // gsap.to('.item', {
    //   scrollTrigger: '.item',
    //   x: 500,
    // });

    // const item = gsap.utils.toArray('.info-item');
    const trigger = 'top 90%';
    const duration = 4;

    // items.forEach((item) => {
    //   gsap.from(item, {
    //     opacity: 0,
    //     duration: duration,
    //     y: -50,
    //     scrollTrigger: {
    //       trigger: item,
    //       start: trigger,
    //     },
    //   });
    // });

    const item = gsap.fromTo(
      iconRef.current,
      {
        translateY: '-100px',
        opacity: '0%',
      },
      {
        translateY: 0,
        opacity: '100%',
        ease: 'ease',
        duration: 2,

        scrollTrigger: {
          trigger: iconRef.current,
          start: 'top: 80%',
          end: 'top: 20%',
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <div className="info-item" ref={iconRef}>
      <div className="icon-wrapper">
        <motion.div
          className="icon"
          style={{
            background: bgColor,
          }}>
          {icon}
        </motion.div>
      </div>
      <div className="content">
        <div className="boldText">
          <h3>{title}</h3>
        </div>
        <p className="body fadeText light-text">{body}</p>
      </div>
    </div>
  );
};

export default InformItem;
