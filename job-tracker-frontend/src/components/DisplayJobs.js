import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteJob,
  getCategoryJobs,
  resetJobState,
} from '@/features/job/jobSlice';
import Job from './content/Job';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const DisplayJobs = ({ setCurrentJob }) => {
  const dispatch = useDispatch();

  const { jobs, fetchJobs, category } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (category) {
      console.log(category);
      dispatch(getCategoryJobs({ category: category }));
      // dispatch(resetJobState());
      console.log('fetching jobs');
    }
  }, [fetchJobs]);

  // Must be in a state, because setting current job causes a re-render but values set as useStates don't disappear during a re-render.
  const [jobsToRender, setJobsToRender] = useState([]);
  useEffect(() => {
    setJobsToRender([]);
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

  // return displayState.getJobs;
  // return gettingJobs ? <Loading /> : displayState.getJobs;
  return displayState.getJobs;
};

export default DisplayJobs;
