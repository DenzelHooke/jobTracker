import { useState, useEffect } from 'react';
import StatusCheckbox from '../statusCheckbox';

const AddJob = () => {
  const [formData, setFormData] = useState({
    company: '',
    address: '',
    email: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

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
          <button
            className="round-panel button buttonHoverSuccess"
            type="submit">
            Create Job
          </button>
        </form>
      </div>
      <StatusCheckbox />
    </>
  );
};

export default AddJob;
