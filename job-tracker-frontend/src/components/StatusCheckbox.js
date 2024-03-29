import { useState, useEffect } from 'react';
import { BsSendCheckFill, BsHourglassSplit } from 'react-icons/bs';
import { FaSadCry } from 'react-icons/fa';
const StatusCheckbox = ({ onStatusChange, editMode, currentJob }) => {
  const [status, setStatus] = useState({
    applied: true,
    pending: false,
    rejected: false,
  });

  const size = 15;
  const onClick = (e) => {
    if (e.target !== e.currentTarget) return;
    // console.log(e.currentTarget);
    setStatus(() => ({
      applied: false,
      pending: false,
      rejected: false,
      [e.target.id]: true,
    }));
  };

  useEffect(() => {
    if (editMode && currentJob) {
      setStatus({
        applied: currentJob.applied || false,
        pending: currentJob.pending || false,
        rejected: currentJob.rejected || false,
      });
    }
  }, [editMode, currentJob]);

  useEffect(() => {
    onStatusChange(status);
  }, [status]);

  return (
    <div className="status-checkbox-wrapper">
      <p>Select a status</p>
      <div
        className={`status-checkbox clickable white-text no-click-child ${
          status.applied ? 'acceptedBG' : 'off'
        }`}
        onClick={onClick}
        id="applied">
        {/* <BsSendCheckFill size={15} /> */}
        <span className="status-item-text">Applied</span>
      </div>
      <div
        className={`status-checkbox clickable white-text no-click-child ${
          status.pending ? 'pendingBG' : 'off'
        }`}
        onClick={onClick}
        id="pending">
        {/* <BsHourglassSplit size={15} /> */}
        <span className="status-item-text">Haven't applied yet</span>
      </div>
      <div
        className={`status-checkbox clickable white-text no-click-child ${
          status.rejected ? 'rejectedBG' : 'off'
        }`}
        onClick={onClick}
        id="rejected">
        {/* <FaSadCry size={15} /> */}
        <span className="status-item-text">Rejected</span>
      </div>
    </div>
  );
};

export default StatusCheckbox;
