import { useState, useEffect } from 'react';

import FormWrapper from './FormWrapper';
import NewUserForm from './NewUserForm';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: null,
    password1: null,
    password2: null,
  });

  const onSubmit = () => {
    // onSubmit();
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <NewUserForm formData={formData} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default RegisterForm;
