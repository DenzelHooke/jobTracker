import { useState, useEffect } from 'react';
import StatusCheckbox from '../StatusCheckbox';
import { createJob } from '@/features/job/jobSlice';
import { useDispatch } from 'react-redux';
import { setError, reset } from '@/features/utils/utilsSlice/';
import FileUpload from './FileUpload';
import { generateFormData } from '@/helpers/auth/createJobData';

const AddJob = () => {
  const dispatch = useDispatch();

  const [formFiles, setFormFiles] = useState({
    resume: false,
    cover: false,
  });
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    email: '',
    status: {},
  });

  const onSubmit = (e) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    e.preventDefault();
    if (formData.company.length < 1) {
      console.log('ADD FORM SUBMIT');
      dispatch(setError('Please provide a valid company name to continue'));
      return;
    }

    if (formData.email.length > 0) {
      if (!formData.email.match(validRegex)) {
        dispatch(setError('Please provide a valid company email address'));
      }
    }

    const newFormData = generateFormData({
      company: formData.company,
      email: formData.email,
      position: formData.position,
      jobStatus: formData.status,
      resumePDF: formFiles.resume,
    });
    console.log(...newFormData);

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

  useEffect(() => {
    console.log(formFiles);
  }, [formFiles]);

  return (
    <>
      <div className="form-wrapper no-flex">
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="form no-flex"
          encType="multipart/form-data">
          <div id="company-wrapper">
            <label>Company</label>
            <input
              type="text"
              placeholder="What's the company name?"
              onChange={onChange}
              id="company"
              className="input"
              value={formData.company}
            />
          </div>
          <div id="email-wrapper">
            <label>Email Address</label>
            <input
              type="text"
              placeholder="Email of recruiter (Optional)"
              onChange={onChange}
              id="email"
              className="input"
              value={formData.email}
            />
          </div>
          <div id="position-wrapper">
            <label htmlFor="">Job Position</label>
            <input
              type="text"
              placeholder="Enter job position (Optional)"
              onChange={onChange}
              id="position"
              className="input"
              value={formData.position}
            />
          </div>
          <FileUpload formFiles={formFiles} setFormFiles={setFormFiles} />
          <StatusCheckbox onStatusChange={onStatusChange} />
          <button
            className="round-panel button buttonHoverSuccess"
            type="submit">
            Create Job
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;
