import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { resetAuth } from '../features/auth/authSlice';
import { useRouter } from 'next/router';
import { loginUser } from '../features/auth/authSlice';

const LoginUser = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard');
      dispatch(setSuccess('Welcome home pal!'));
    } else if (isError) {
      dispatch(setError(message));
    }
    dispatch(resetAuth());
  }, [isSuccess, isError]);

  const onSubmit = (e) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const { email, password } = formData;

    e.preventDefault();
    if (!email || !password) {
      dispatch(setError('Please fill out all fields'));
      return;
    }

    if (!email.match(validRegex)) {
      dispatch(setError('Please enter a valid email address'));
      return;
    }

    dispatch(loginUser(formData));
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit} id="login-form" className="form">
        <input
          type="text"
          id="email"
          className="input"
          placeholder="Email address"
          onChange={onChange}
        />
        <input
          type="text"
          id="password"
          className="input"
          placeholder="Password"
          onChange={onChange}
        />
        <button className="button buttonHoverDark">Login</button>
      </form>
    </>
  );
};

export default LoginUser;
