import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { resetAuth } from '../features/auth/authSlice';
import { registerUser } from '@/features/auth/authSlice';
import { useRouter } from 'next/router';
import RegisterNotifs from './RegisterNotifs';

const checkPassLength = (password, min, max) => {
  if (password.length >= min && password.length <= max) {
    return true;
  }

  return false;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: false,
    password1: '',
    password2: '',
  });

  const [emailValid, setEmailValid] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isPasswordConfirm, setPasswordConfirm] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const validRegex =
    /^(?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)*$/;

  const passwordMin = 5;
  const passwordMax = 20;

  useEffect(() => {
    const { email } = formData;

    // email
    if (!email) {
      return;
    }
    if (!email.match(validRegex)) {
      setEmailValid(false);
    } else {
      console.log(email.match(validRegex));
      setEmailValid(true);
    }
  }, [formData.email]);

  useEffect(() => {
    const { password1, password2 } = formData;

    if (!checkPassLength(password1, passwordMin, passwordMax)) {
      console.log(
        'pass length: ',
        checkPassLength(password1, passwordMin, passwordMax)
      );
      setPasswordLength(false);
    } else {
      setPasswordLength(true);
    }

    if (password1.length < 1 || password2.length < 1) {
      setPasswordConfirm(false);
      return;
    }

    if (password1 === password2) {
      console.log('equal ', password1, password2);
      setPasswordConfirm(true);
      return;
    } else {
      setPasswordConfirm(false);
    }
  }, [formData]);
  ``;
  useEffect(() => {}, [formData]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard');
      dispatch(setSuccess('Account successfully created'));
    } else if (isError) {
      dispatch(setError(message));
    }
    dispatch(resetAuth());
  }, [isSuccess, isError]);

  const onSubmit = (e) => {
    const { email, password1, password2 } = formData;

    e.preventDefault();
    if (!email || !password1 || !password2) {
      dispatch(setError('Please fill out all fields'));
      return;
    }

    if (!email.match(validRegex)) {
      dispatch(setError('Please enter a valid email address'));
      return;
    }

    if (password1 != password2) {
      dispatch(setError('Passwords do not match'));
      return;
    }

    if (!checkPassLength(password1, passwordMin, passwordMax)) {
      dispatch(
        setError(
          `Password must be between ${passwordMin} to ${passwordMax} characters`
        )
      );
      return;
    }

    // Data is valid
    dispatch(registerUser({ email, password: password1 }));
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit} id="register-form" className="form">
        <RegisterNotifs
          emailValid={emailValid}
          passwordLength={passwordLength}
          isPasswordConfirm={isPasswordConfirm}
          passwordMin={passwordMin}
          passwordMax={passwordMax}
        />
        <input
          type="text"
          id="email"
          className="input"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="text"
          id="password1"
          className="input"
          placeholder="Create a password"
          onChange={onChange}
        />
        <input
          type="text"
          id="password2"
          className="input"
          placeholder="Confirm password"
          onChange={onChange}
        />
        <button className="button buttonHoverDark">Create Account</button>
      </form>
    </>
  );
};

export default RegisterForm;
