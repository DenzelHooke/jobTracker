import { useEffect, useRef, useState } from 'react';
import FileUpload from './FileUpload';
import StatusCheckbox from '../StatusCheckbox';
import { createJob, editJob } from '@/features/job/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setError, reset } from '@/features/utils/utilsSlice/';
import { generateFormData } from '@/helpers/auth/createJobData';
import { motion, AnimatePresence } from 'framer-motion';

const defaultStatus = () => ({
  applied: true,
  pending: false,
  rejected: false,
});

const JobForm = ({ title, jobID, isModal, editMode }) => {
  const dispatch = useDispatch();
  const { currentJob } = useSelector((state) => state.jobs);
  const defaultFormData = {
    company: '',
    position: '',
    email: '',
    status: defaultStatus(),
  };

  const [formFiles, setFormFiles] = useState({
    resume: false,
    cover: false,
  });

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (currentJob && !isModal) {
      setFormData({
        company: currentJob.company_name || '',
        position: currentJob.company_position || '',
        email: currentJob.company_email || '',
        status: currentJob.status || defaultStatus(),
      });

      return;
    }

    if (isModal) {
      setFormData(defaultFormData);
    }
  }, [currentJob, isModal]);

  const onSubmit = (e) => {
    // const validRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    e.preventDefault();
    if (formData.company.length < 1) {
      dispatch(setError('Please provide a valid company name to continue'));
      return;
    }

    // if (formData.email.length > 0) {
    //   if (!formData.email.match(validRegex)) {
    //     dispatch(setError('Please provide a valid company email address'));
    //   }
    // }

    // Formdata jobject is needed to pass file data to backend api.
    const newFormData = generateFormData({
      company: formData.company,
      email: formData.email,
      position: formData.position,
      jobStatus: formData.status,
      resumePDF: formFiles.resume,
    });

    if (editMode) {
      dispatch(editJob({ data: newFormData, jobID }));
      return;
    }

    dispatch(createJob(newFormData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onStatusChange = (status) => {
    setFormData((prevState) => ({
      ...prevState,
      status: status,
    }));
  };

  const addJobVariant = {
    visible: {
      opacity: ['0%', '100%'],
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
    fade: {
      opacity: ['100%', '0%'],
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
  };

  return (
    <div id="job-form-wrapper" className="job-form-wrapper">
      <motion.div
        className="no-flex"
        variants={addJobVariant}
        exit={{
          y: -1000,
        }}
        animate="visible">
        {title && (
          <>
            <h2>{title}</h2>
          </>
        )}
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="form"
          encType="multipart/form-data">
          <div className="inputs-wrapper">
            <div id="company-wrapper" className="input-wrapper">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter company name"
                onChange={onChange}
                id="company"
                className="input"
                value={formData.company}
              />
            </div>
            {/* <div id="email-wrapper">
              <label>Email Address</label>
              <input
                type="text"
                placeholder="Email of recruiter"
                onChange={onChange}
                id="email"
                className="input"
                value={formData.email}
              />
            </div> */}
            <div id="position-wrapper" className="input-wrapper">
              <label htmlFor="">Position</label>
              <input
                type="text"
                placeholder="Enter job role"
                onChange={onChange}
                id="position"
                className="input"
                value={formData.position}
              />
            </div>
            <FileUpload formFiles={formFiles} setFormFiles={setFormFiles} />
          </div>
          <StatusCheckbox
            onStatusChange={onStatusChange}
            editMode={editMode}
            currentJob={currentJob}
          />
          <button className="round-panel button submit-btn" type="submit">
            {editMode ? 'Edit job' : 'Create job'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default JobForm;
