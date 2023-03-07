import React from 'react';

import FormWrapper from '../components/FormWrapper';
import LoginForm from '../components/LoginForm';

function login() {
  return (
    <div className="page flex flex-justify-center flex-align-center">
      <div className="flex flex-justify-center flex-align-center fill-page">
        <FormWrapper
          form={<LoginForm />}
          message="Welcome back"
          className="login-form-wrapper shadow-panel white-bg round-panel form-panel"
        />
      </div>
    </div>
  );
}

export default login;
