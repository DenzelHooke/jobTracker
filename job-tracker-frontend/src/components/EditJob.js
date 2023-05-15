import { useEffect, useState } from 'react';
import JobForm from './content/JobForm';

const EditJob = ({ job }) => {
  return <JobForm jobID={job} editMode={true} />;
};

export default EditJob;
