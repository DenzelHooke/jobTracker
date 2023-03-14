import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { resetJobState } from '@/features/job/jobSlice';
import { permissionDeniedText } from '../helpers/auth/auth';
import Sidebar from '../components/Sidebar';
import Applied from '../components/content/Applied';
import Rejected from '../components/content/Rejected';
import Modal from '../components/content/Modal';
import AddJob from '@/components/content/AddJob';
import { GoPlus } from 'react-icons/go';
import axios from 'axios';
import { getCategoryJobs } from '@/features/job/jobSlice';
import DisplayJobs from '@/components/DisplayJobs';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

export default function Dashboard() {
  const [content, setContent] = useState({
    current: 'applied',
  });
  const { user } = useSelector((state) => state.auth);
  const { isJobError, isJobSuccess, jobMessage } = useSelector(
    (state) => state.jobs
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const [displayingModal, setDisplayingModal] = useState(false);

  const contentStates = {
    applied: <Applied />,
    rejected: <Rejected />,
  };

  useEffect(() => {
    dispatch(getCategoryJobs({ categoryID: content.current }));
  }, [content]);

  useEffect(() => {
    if (isJobError) {
      dispatch(setError(jobMessage));
    } else if (isJobSuccess) {
      dispatch(setSuccess(jobMessage));
    }
    dispatch(resetJobState());
  }, [isJobError, isJobSuccess]);

  useEffect(() => {
    document.getElementById('layout').classList.add('layout-dashboard');

    if (!user) {
      dispatch(setError(permissionDeniedText()));
      router.push('/login');
    }

    return () => {
      document.getElementById('layout').classList.remove('layout-dashboard');
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
        <Modal
          setModal={setDisplayingModal}
          content={<AddJob />}
          className="add-job-modal"
        />
      )}
      <Sidebar content={content.current} onSelect={onSidebarSelect} />
      <div className="content">
        <div className="dashboard-intro">
          <h2>Dashboard</h2>
          <button className="round-panel" onClick={() => onCreateNewClick()}>
            Create new <GoPlus size={25} />
          </button>
        </div>
        <DisplayJobs />
      </div>
    </div>
  );
}

// export const getServerSideProps = async (request) => {
//   axios.get(`${API_URL}/authenticate/`, {

//   });
// };
