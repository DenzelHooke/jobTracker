import { useState, useEffect } from 'react';
import FormWrapper from '@/components/FormWrapper';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  const onSubmit = () => {
    console.log('SUBMIT');
  };

  return (
    <div className="page">
      <div className="flex flex-align-center flex-row fill-page">
        <div className="global-container">
          <FormWrapper
            form={<RegisterForm />}
            className="register-form-wrapper"
          />
        </div>
      </div>
    </div>
  );
}
