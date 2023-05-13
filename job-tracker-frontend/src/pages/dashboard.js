import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setError, setSuccess } from '../features/utils/utilsSlice';
import { resetJobState } from '@/features/job/jobSlice';
import { permissionDeniedText } from '../helpers/auth/auth';
import Sidebar from '../components/Sidebar';
import Modal from '../components/content/Modal';
import { GoPlus } from 'react-icons/go';
import { getCategoryJobs, setCategory, getJob } from '@/features/job/jobSlice';
import DisplayJobs from '@/components/DisplayJobs';
import EditJob from '@/components/EditJob';
import JobForm from '@/components/content/JobForm';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { isJobError, isJobSuccess, jobMessage, category, gettingJobs } =
    useSelector((state) => state.jobs);

  const router = useRouter();
  const dispatch = useDispatch();
  const [displayingModal, setDisplayingModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(false);

  useEffect(() => {
    if (currentJob) {
      dispatch(getJob({ job_id: currentJob }));
      // CALL CURRENT JOB AND SEND DATA TO DASHBOARD FORM
      //TODO Call current job
      //TODO Set job data to current job id
    }
  }, [currentJob]);

  useEffect(() => {
    dispatch(getCategoryJobs({ categoryID: category }));
  }, [category]);

  useEffect(() => {
    if (isJobError) {
      dispatch(setError(jobMessage));
    } else if (isJobSuccess) {
      dispatch(setSuccess(jobMessage));
      dispatch(getCategoryJobs({ categoryID: category }));
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
    dispatch(setCategory(selection));
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
          content={<JobForm title="Add a job" />}
          className="add-job-modal"
        />
      )}
      <Sidebar currentPage={category} onSelect={onSidebarSelect} />
      <div className="content">
        {/* <div className="dashboard-intro">
          <h2>Dashboard</h2>
          <button className="round-panel" onClick={() => onCreateNewClick()}>
            Create new <GoPlus size={25} />
          </button>
        </div> */}
        <DisplayJobs setCurrentJob={setCurrentJob} />
      </div>
      <div className="edit-job">
        <EditJob job={currentJob} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (request) => {
  try {
    console.log('Authenticating user');
    // const res = authService.authenticate();

    return { props: {} };
  } catch (error) {}
};
