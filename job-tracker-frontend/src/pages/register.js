import { useState, useEffect } from 'react';
import FormWrapper from '@/components/FormWrapper';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  const onSubmit = () => {
    console.log('SUBMIT');
  };

  return (
    <div className="page flex flex-justify-center flex-align-center">
      <div className="flex flex-justify-center flex-align-center fill-page">
        <FormWrapper
          form={<RegisterForm />}
          message="Create account"
          className="register-form-wrapper shadow-panel white-bg round-panel form-panel"
        />
      </div>
    </div>
  );
}
