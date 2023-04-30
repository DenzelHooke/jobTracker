import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const displayStatus = ({ bool, falseText, trueText }) => {
  if (!bool) {
    return falseText;
  }

  return trueText;
};

const RegisterNotifs = ({ emailValid, passwordLength, isPasswordConfirm }) => {
  const [values, setValues] = useState([
    {
      value: {
        valid: emailValid,
        falseText: 'Your email is invalid',
        trueText: 'Your email is valid',
      },
    },
    {
      value: {
        valid: passwordLength,
        falseText: 'Password must be between 5 - 20 characters.',
        trueText: 'Your password is valid',
      },
    },
    {
      value: {
        valid: isPasswordConfirm,
        falseText: "Passwords don't match",
        trueText: 'Passwords match',
      },
    },
  ]);

  useEffect(() => {
    const bools = [emailValid, passwordLength, isPasswordConfirm];

    for (let i = 0; i < values.length; i++) {
      const bool = bools[i];

      values[i].value.valid = bool;
    }
  }, [emailValid, passwordLength, isPasswordConfirm]);

  return (
    <div className="signup-stats">
      <ul>
        {values.map((item, index) => {
          return <li key={uuid()}>{
            item.value.valid ? item.value.trueText : item.value.falseText
          }</li>;
        })}
      </ul>
    </div>
  );
};

export default RegisterNotifs;
