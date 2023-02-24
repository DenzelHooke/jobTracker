import React from 'react';

const FormWrapper = ({ form, svg, message, className }) => {
  return (
    <div className={`form-wrapper ${className && className}`}>
      <div className="immediate-info">
        <div className="form-message-wrapper">
          <h2 className="">{message}</h2>
        </div>
        <div className="svg-wrapper">{svg}</div>
      </div>
      {form}
    </div>
  );
};

export default FormWrapper;
