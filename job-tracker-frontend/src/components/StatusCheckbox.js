import { useState, useEffect } from 'react';
import { BsSendCheckFill, BsHourglassSplit } from 'react-icons/bs';
import { FaSadCry } from 'react-icons/fa';
const StatusCheckbox = () => {
  const [status, setStatus] = useState({
    applied: false,
    pending: false,
    rejected: false,
  });
  const size = 15;
  const onClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <div className="status-checkbox-wrapper">
      <div
        className={`status-checkbox clickable`}
        onClick={onClick}
        id="applied-btn">
        <BsSendCheckFill size={15} />
        <span>Appld</span>
      </div>
      <div
        className={`status-checkbox clickable`}
        onClick={onClick}
        id="pending-btn">
        <BsHourglassSplit size={15} />
        <span>Haven't applied yet</span>
      </div>
      <div
        className={`status-checkbox clickable`}
        onClick={onClick}
        id="rejected-btn">
        <FaSadCry size={15} />
        <span>Rejected</span>
      </div>
    </div>
  );
};

export default StatusCheckbox;
