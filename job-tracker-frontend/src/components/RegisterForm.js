import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { resetAuth } from '../features/auth/authSlice';
import { registerUser } from '@/features/auth/authSlice';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: null,
    password1: null,
    password2: null,
  });

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
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
