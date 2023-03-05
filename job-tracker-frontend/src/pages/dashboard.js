import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { permissionDeniedText } from '../helpers/auth/auth';
import Sidebar from '../components/Sidebar';
import Applied from '../components/content/Applied';
import Rejected from '../components/content/Rejected';

export default function Dashboard() {
  const [content, setContent] = useState({
    current: 'applied',
  });
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const contentStates = {
    applied: <Applied />,
    rejected: <Rejected />,
  };

  useEffect(() => {
    document.getElementById('layout').classList.add('layout-dashboard');

    if (!user) {
      dispatch(setError(permissionDeniedText()));
      router.push('/login');
    }
  });

  const onSidebarSelect = (value) => {
    let selection = value.toLowerCase();
    selection = selection.trim();
    setContent({
      current: selection,
    });
  };

  return (
    <div id="dashboard">
      <Sidebar content={content.current} onSelect={onSidebarSelect} />
      <div className="content">
        <div>
          <h2>Dashboard</h2>
          <button className="round-panel">
            Create new <span className="icon"></span>
          </button>
        </div>
        {contentStates[`${content.current}`]}
      </div>
    </div>
  );
}
