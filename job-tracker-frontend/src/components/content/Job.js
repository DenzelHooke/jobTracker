import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsTrash3Fill, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { MdEmail, MdOutlineExpandCircleDown } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { returnNA } from '@/helpers/data/strings';
import { getImageAccess } from '@/features/job/jobService';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';
import Image from 'next/image';
import DocumentPDF from '../DocumentPDF';

const Job = ({ job }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [coverURL, setCoverURL] = useState('');
  const [resumeURL, setResumeURL] = useState('');
  const [expandHeight, setExpandHeight] = useState('426px');
  const shrinkHeight = '140px';
  const iconSize = 20;
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.jobs);

  useState(async () => {
    console.log('BOOP');
    if (job.id) {
      const { resume_url, cover_url } = await getImageAccess(job.id);
      setResumeURL(resume_url);
      setCoverURL(cover_url);
    }

    return () => setIsExpand(false);
  }, [job.id]);

  const jobVariant = {
    shrink: {
      maxHeight: shrinkHeight,
    },
    expand: {
      maxHeight: expandHeight,
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

  const onJobDelete = (job_id) => {
    console.log('delete job ', job_id);
    dispatch(deleteJob({ job_id, category }));
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
          <span className="italic company">Company</span>
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
            <span className="italic small">Position</span>
            <br />
            <span>{returnNA(job.position)}</span>
          </div>
          <div className="item">
            <div></div>
            <motion.div className="resume">
              <BsFileEarmarkPdfFill size={iconSize} />
              <span className="italic small">Documents</span>
              <br />
              <DocumentPDF
                url={resumeURL}
                icon={<BsFileEarmarkPdfFill />}
                setExpandHeight={setExpandHeight}
              />
            </motion.div>
            <img src={coverURL ? coverURL : ''} alt="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Job;
