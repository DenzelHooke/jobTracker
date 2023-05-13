import { useEffect, useState } from 'react';
import JobForm from './content/JobForm';

const EditJob = ({ job }) => {
  return <JobForm jobData={job} />;
};

export default EditJob;
