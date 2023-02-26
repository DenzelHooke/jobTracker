import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { resetError } from '../features/utils/utilsSlice';

const NotifyWatcher = () => {
  const { isError, isSuccess, message } = useSelector((state) => state.utils);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(resetError());
  }, [isError, isSuccess, message]);
};

export default NotifyWatcher;
