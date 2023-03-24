import { useState, useEffect } from 'react';
import StatusCheckbox from '../StatusCheckbox';
import { createJob } from '@/features/job/jobSlice';
import { useDispatch } from 'react-redux';
import { setError, reset } from '@/features/utils/utilsSlice/';
import FileUpload from './FileUpload';
import { generateFormData } from '@/helpers/auth/createJobData';

const AddJob = () => {
  const dispatch = useDispatch();

  const [formFiles, setFormFiles] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    address: '',
    email: '',
    status: {},
    resume: false,
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
      address: formData.address,
      jobStatus: formData.status,
      resumePDF: formFiles,
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
        <form onSubmit={onSubmit} autoComplete="off" className="form no-flex">
          <div>
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Enter the business name"
              onChange={onChange}
              id="company"
              className="input"
              value={formData.company}
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="text"
              placeholder="Enter company email address"
              onChange={onChange}
              id="email"
              className="input"
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="">Street Address</label>
            <input
              type="text"
              placeholder="Enter company address"
              onChange={onChange}
              id="address"
              className="input"
              value={formData.address}
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
