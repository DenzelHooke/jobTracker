import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { permissionDeniedText } from '../helpers/auth/auth';
import Sidebar from '../components/Sidebar';
import Applied from '../components/content/Applied';
import Rejected from '../components/content/Rejected';
import Modal from '../components/content/Modal';
import AddJob from '@/components/content/AddJob';
import { GoPlus } from 'react-icons/go';

export default function Dashboard() {
  const [content, setContent] = useState({
    current: 'applied',
  });
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [displayingModal, setDisplayingModal] = useState(false);

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

    return () => {
      setDisplayingModal(false);
    };
  }, []);

  const onSidebarSelect = (value) => {
    let selection = value.toLowerCase();
    selection = selection.trim();
    setContent({
      current: selection,
    });
  };

  const onCreateNewClick = () => {
    setDisplayingModal(true);
    console.log('Creating modal');
  };

  return (
    <div id="dashboard">
      {displayingModal && (
        <Modal setModal={setDisplayingModal} content={<AddJob />} />
      )}
      <Sidebar content={content.current} onSelect={onSidebarSelect} />
      <div className="content">
        <div className="dashboard-intro">
          <h2>Dashboard</h2>
          <button className="round-panel" onClick={() => onCreateNewClick()}>
            Create new <GoPlus size={25} />
          </button>
        </div>
        {contentStates[`${content.current}`]}
      </div>
    </div>
  );
}
