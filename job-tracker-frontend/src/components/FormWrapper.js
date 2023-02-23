import React from 'react';

const FormWrapper = ({ form, svg, message, className }) => {
  return (
    <div className={`form-wrapper ${className && className}`}>
      <div className="form-message">{message}</div>
      <div className="svg-wrapper">{svg}</div>
      {form}
    </div>
  );
};

export default FormWrapper;
