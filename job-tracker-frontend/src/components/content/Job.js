import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsTrash3Fill } from 'react-icons/bs';
import { MdEmail, MdOutlineExpandCircleDown } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { returnNA } from '@/helpers/data/strings';

const Job = ({ job }) => {
  const [isExpand, setIsExpand] = useState(false);
  const expandHeight = '300px';
  const shrinkHeight = '140px';
  const iconSize = 20;

  useState(() => {
    console.log('BOOP');
    return () => setIsExpand(false);
  }, [job.id]);

  const jobVariant = {
    shrink: {
      height: shrinkHeight,
    },
    expand: {
      height: expandHeight,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 40,
      },
    },
  };

  const tags = {
    initial: 'shrink',
    animate: isExpand ? 'expand' : '',
  };

  const onExpandJob = (id) => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <motion.div
      {...tags}
      variants={jobVariant}
      className="job-item-wrapper"
      key={job.id}
      id={`job-${job.id}`}>
      <div className="job-item">
        <div className="job-title">
          <div className="interactables">
            <button
              onClick={() => onJobDelete(job.id)}
              className="deleteBtn roundBtn clickable rectangleBtn">
              <BsTrash3Fill size={iconSize} className="icon" />
            </button>
            <button
              className="expandBtn roundBtn clickable rectangleBtn"
              onClick={(e) => onExpandJob(`job-${job.id}`)}>
              <MdOutlineExpandCircleDown size={iconSize} className="icon" />
            </button>
          </div>
          <br />
          <span className="italic">Company</span>
          <br />
          <h3>{job.company_name}</h3>
        </div>
        <div className="contact">
          <div className="item">
            <ImOffice size={iconSize} />
            <span className="italic small">Company email</span>
            <br />
            <div>
              <span>{returnNA(job.company_email)}</span>
            </div>
          </div>
          <div className="item">
            <MdEmail size={iconSize} />
            <span className="italic small">Company address</span>
            <br />
            <div>
              <span>{returnNA(job.company_address)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Job;
