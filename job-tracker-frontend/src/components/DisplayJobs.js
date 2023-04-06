import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';
import Job from './content/Job';
import { v4 as uuidv4 } from 'uuid';

const DisplayJobs = () => {
  const dispatch = useDispatch();

  const { jobs, category } = useSelector((state) => state.jobs);
  useEffect(() => {
    // console.log(jobs);
  }, [jobs]);

  return (
    <>
      <div className="jobs-wrapper">
        {jobs.length > 0
          ? jobs.map((job) => {
              return <Job job={job} key={uuidv4()} />;
            })
          : "You don't have any jobs saved for this category."}
      </div>
    </>
  );
};

export default DisplayJobs;
