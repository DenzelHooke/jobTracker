import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const DisplayJobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <>
      <div className="jobs-wrapper">
        {jobs.length > 0
          ? jobs.map((job) => {
              return (
                <>
                  <div className="job-item-wrapper">
                    <div className="job-item">
                      <div className="job-title">
                        <h3>{job.company_name}</h3>
                      </div>
                      <div className="contact">
                        <div>
                          <span>Email:</span> <span>{job.company_email}</span>
                        </div>
                        <div>
                          <span>Address:</span>{' '}
                          <span>{job.company_address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : 'Nothing loaded'}
      </div>
    </>
  );
};

export default DisplayJobs;
