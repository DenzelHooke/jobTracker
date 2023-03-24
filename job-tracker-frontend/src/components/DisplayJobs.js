import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '@/features/job/jobSlice';

const DisplayJobs = () => {
  const dispatch = useDispatch();

  const { jobs, category } = useSelector((state) => state.jobs);
  useEffect(() => {
    // console.log(jobs);
  }, [jobs]);

  const onJobDelete = (job_id) => {
    console.log('delete job ', job_id);
    dispatch(deleteJob({ job_id, category }));
  };

  return (
    <>
      <div className="jobs-wrapper">
        {jobs.length > 0
          ? jobs.map((job) => {
              return (
                <div className="job-item-wrapper" key={job.id}>
                  <div className="job-item">
                    <div className="job-title">
                      <button onClick={() => onJobDelete(job.id)}>
                        DELETE
                      </button>
                      <h3>{job.company_name}</h3>
                    </div>
                    <div className="contact">
                      <div>
                        <span>Email:</span> <span>{job.company_email}</span>
                      </div>
                      <div>
                        <span>Address:</span> <span>{job.company_address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : 'Nothing loaded'}
      </div>
    </>
  );
};

export default DisplayJobs;
