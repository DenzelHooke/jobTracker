import React from 'react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Mission = () => {
  const titleRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const titleAnim = gsap.fromTo(
      titleRef.current,
      {
        translateX: '-50vw',
        opacity: '0%',
      },
      {
        translateX: 0,
        opacity: '100%',
        ease: 'ease-out',

        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 3,
        },
      }
    );
  }, []);

  return (
    <section className="mission section">
      <div className="max-container">
        <h2 className="title" ref={titleRef}>
          Maximize productivity to it's <span className="boldText">PEAK</span>
        </h2>
        <div className="utility">
          <div className="image-container">
            <Image
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
              width={600}
              height={800}
              alt="Snowy mountain peak"
            />
          </div>
          <div className="container">
            <p className="prelude fadeText">THE GOAL</p>
            <p className="text-body">
              Our mission is to provide a comprehensive and user-friendly
              platform for job seekers to keep track of their job applications.
              We believe that the job search process can be overwhelming,
              especially when applying to multiple companies at once. Our
              website is designed to help individuals stay organized and on top
              of their job search by providing a centralized location to store
              and manage their applications. We strive to offer a seamless and
              intuitive user experience that empowers job seekers to take
              control of their job search and achieve their career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
