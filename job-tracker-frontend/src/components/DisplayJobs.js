import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';
import Job from './content/Job';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const DisplayJobs = () => {
  const dispatch = useDispatch();

  const { jobs, gettingJobs } = useSelector((state) => state.jobs);
  const displayState = {
    getJobs: (
      <div className="jobs-wrapper">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            return <Job job={job} key={uuidv4()} />;
          })
        ) : (
          <>
            <p>😥 You don't have any jobs saved in this category.</p>
          </>
        )}
      </div>
    ),
  };

  return gettingJobs ? <Loading /> : displayState.getJobs;
};

export default DisplayJobs;
