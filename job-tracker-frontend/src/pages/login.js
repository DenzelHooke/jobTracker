import React from 'react';

import FormWrapper from '../components/FormWrapper';
import LoginForm from '../components/LoginForm';
import Blobs from '@/components/Blobs';

function login() {
  return (
    <>
      <div className="page flex flex-justify-center flex-align-center ">
        <Blobs />
        <div className="flex flex-justify-center flex-align-center fill-page blueBg relative">
          <FormWrapper
            form={<LoginForm />}
            message="Welcome back"
            className="login-form-wrapper shadow-panel white-bg round-panel form-panel shrinkUI"
          />
        </div>
      </div>
    </>
  );
}

export default login;
