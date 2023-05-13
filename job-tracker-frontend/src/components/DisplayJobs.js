import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';
import Job from './content/Job';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const DisplayJobs = ({ setCurrentJob }) => {
  const { jobs, gettingJobs } = useSelector((state) => state.jobs);
  // Must be in a state, because setting current job causes a re-render but values set as useStates don't disappear during a re-render.
  const [jobsToRender, setJobsToRender] = useState(false);
  useEffect(() => {
    if (jobs.length > 0) {
      setJobsToRender(
        jobs.map((job) => {
          return <Job job={job} key={uuidv4()} setCurrentJob={setCurrentJob} />;
        })
      );
    }
  }, [jobs]);

  const displayState = {
    getJobs: <div className="jobs-wrapper">{jobsToRender}</div>,
  };

  return gettingJobs ? <Loading /> : displayState.getJobs;
};

export default DisplayJobs;
