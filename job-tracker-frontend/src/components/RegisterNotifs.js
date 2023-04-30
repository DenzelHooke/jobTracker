import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const displayStatus = ({ bool, falseText, trueText }) => {
  if (!bool) {
    return falseText;
  }

  return trueText;
};

const passwordConfirm = (bool) => {
  return {
    valid: bool,
    falseText: "Passwords don't match",
    trueText: 'Passwords match',
  };
};

const emailConfirm = (bool) => {
  return {
    valid: bool,
    falseText: 'Your email is invalid',
    trueText: 'Your email is valid',
  };
};

const passwordLengthConfirm = (bool, min, max) => {
  return {
    valid: bool,
    falseText: `Password must be between ${min} - ${max} characters`,
    trueText: 'Your password is valid',
  };
};

const RegisterNotifs = ({
  emailValid,
  passwordLength,
  isPasswordConfirm,
  passwordMin,
  passwordMax,
}) => {
  const [values, setValues] = useState([
    {
      value: emailConfirm(emailValid),
    },
    {
      value: passwordLengthConfirm(passwordLength, passwordMin, passwordMax),
    },
    {
      value: passwordConfirm(isPasswordConfirm),
    },
  ]);

  useEffect(() => {
    setValues([
      {
        value: emailConfirm(emailValid),
      },
      {
        value: passwordLengthConfirm(passwordLength, passwordMin, passwordMax),
      },
      {
        value: passwordConfirm(isPasswordConfirm),
      },
    ]);
  }, [emailValid, passwordLength, isPasswordConfirm]);

  return (
    <div className="signup-stats">
      <ul>
        {values.map((item, index) => {
          return (
            <li key={uuid()}>
              {item.value.valid ? item.value.trueText : item.value.falseText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegisterNotifs;
