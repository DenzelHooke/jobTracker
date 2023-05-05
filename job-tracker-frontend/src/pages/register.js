import { useState, useEffect } from 'react';
import FormWrapper from '@/components/FormWrapper';
import RegisterForm from '@/components/RegisterForm';
import Blobs from '@/components/Blobs';

export default function Register() {
  return (
    <div className="page flex flex-justify-center flex-align-center">
      <Blobs />
      <div className="flex flex-justify-center flex-align-center fill-page relative ">
        <FormWrapper
          form={<RegisterForm />}
          message="Create account"
          className="register-form-wrapper shadow-panel white-bg round-panel form-panel shrinUI"
        />
      </div>
    </div>
  );
}
