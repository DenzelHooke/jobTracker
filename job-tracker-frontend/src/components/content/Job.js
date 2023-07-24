import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BsTrash3Fill,
  BsFileEarmarkPdfFill,
  BsPaperclip,
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
} from 'react-icons/bs';
import { MdEmail, MdOutlineExpandCircleDown } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { returnNA } from '@/helpers/data/strings';
import { getImageAccess } from '@/features/job/jobService';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';
import DocumentPDF from '../DocumentPDF';
import { setError, setSuccess, resetState } from '@/features/utils/utilsSlice';

const addObserver = (element) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
      }
    });
  });

  // Config mutation
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  // Hook observer into element
  observer.observe(element, config);

  // How to dissconnect observer
  // observer.disconnect();
};

const Job = ({ job, setCurrentJob }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [coverURL, setCoverURL] = useState('');
  const [resumeURL, setResumeURL] = useState('');
  const [expandHeight, setExpandHeight] = useState('426px');

  const jobRef = useRef(null);

  const shrinkHeight = '45px';
  const iconSize = 17;
  const dispatch = useDispatch();
  const { category, currentJob } = useSelector((state) => state.jobs);

  useEffect(() => {
    const field_items = document.querySelectorAll('.item-value');

    field_items.forEach((item) => {
      addObserver(item);
    });

    // for (let i = 0; i < field_items.length; i++) {
    //   field_items[i].addEventListener('click', (event) => {
    //     const field = event.target;
    //     field.contentEditable = field.contentEditable === true ? false : true;
    //     console.log('value editable');
    //   });
    // }

    const fetchData = async () => {
      if (job.id) {
        try {
          const { resume_url, cover_url } = await getImageAccess(job.id);
          setResumeURL(resume_url);
          setCoverURL(cover_url);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => setIsExpand(false);
  }, [job.id]);

  // const jobVariant = {
  //   shrink: {
  //     maxHeight: shrinkHeight,
  //   },
  //   expand: {
  //     maxHeight: expandHeight,
  //     transition: {
  //       type: 'spring',
  //       stiffness: 320,
  //       damping: 40,
  //     },
  //   },
  // };

  const buttonVariant = {
    hover: {
      backgroundColor: ['#ececec', '#c3c3c3'],
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 40,
      },
    },
  };

  const tags = {
    initial: 'shrink',
    animate: isExpand ? 'expand' : '',
  };

  const onJobDelete = (job_id) => {
    dispatch(deleteJob({ job_id, category }));
  };

  const onExpandJob = (id) => {
    const job_element = document.querySelector(`#job-${job.id}`);
    setIsExpand((prevState) => {
      if (prevState) {
        job_element.classList.remove('scroll');
      } else {
        job_element.classList.add('scroll');
      }

      return !prevState;
    });
    setCurrentJob(job.id);
  };

  const onValueChange = (val) => {};

  return (
    <motion.div
      {...tags}
      // variants={jobVariant}
      className={`job-item-wrapper ` + `${isExpand ? 'expand' : ''}`}
      key={job.id}
      id={`job-${job.id}`}>
      <div className="job-item">
        <div className="job-title">
          <div>
            {/* <span className="italic company mutedText">Company</span>
            <br /> */}
            <BsPaperclip size={25} />
            <h3 className="item-value" onChange={onValueChange}>
              {job.company_name}
            </h3>
          </div>
          <div className="interactables">
            <motion.button
              variants={buttonVariant}
              whileHover="hover"
              onClick={() => onJobDelete(job.id)}
              className="deleteBtn roundBtn clickable">
              <BsTrash3Fill size={iconSize} className="icon" />
            </motion.button>
            <motion.button
              variants={buttonVariant}
              whileHover="hover"
              className="expandBtn roundBtn clickable"
              onClick={(e) => onExpandJob(`job-${job.id}`)}>
              {isExpand ? (
                <BsArrowsAngleContract size={iconSize} />
              ) : (
                <BsArrowsAngleExpand size={iconSize} />
              )}
            </motion.button>
          </div>
        </div>
        <div className="contact">
          <div className="item">
            <MdEmail size={iconSize} />
            <span className="italic small mutedText">Position</span>
            <br />
            <div className="item-value">{returnNA(job.company_position)}</div>
          </div>
          {/* <div className="item">
            <ImOffice size={iconSize} />
            <span className="italic small mutedText">Company email</span>
            <br />
            <div>
              <div className="item-value">{returnNA(job.company_email)}</div>
            </div>
          </div> */}

          <div className="item">
            <div></div>
            <motion.div className="resume">
              <BsFileEarmarkPdfFill size={iconSize} />
              <span className="italic small mutedText">Documents</span>
              <br />
              <DocumentPDF
                url={resumeURL}
                icon={<BsFileEarmarkPdfFill />}
                type="Resume"
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
