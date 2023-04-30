import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BsFillCheckCircleFill } from 'react-icons/bs';

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

  const iconSize = 15;

  return (
    <div className="signup-stats conditions">
      <ul>
        {values.map((item, index) => {
          return (
            <li
              key={uuid()}
              className={
                `condition` + `${item.value.valid ? ' success' : ' invalid'}`
              }>
              <span>
                <BsFillCheckCircleFill size={iconSize} />
              </span>
              {item.value.valid ? item.value.trueText : item.value.falseText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegisterNotifs;
