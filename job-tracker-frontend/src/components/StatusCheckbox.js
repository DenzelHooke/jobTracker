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
    if (e.target !== e.currentTarget) return;
    console.log(e.currentTarget);
    setStatus(() => ({
      applied: false,
      pending: false,
      rejected: false,
      [e.target.id]: !status[`${e.target.id}`],
    }));
  };

  return (
    <div className="status-checkbox-wrapper">
      <div
        className={`status-checkbox clickable greenery-green-bg white-text no-click-child`}
        onClick={onClick}
        id="applied">
        <BsSendCheckFill size={15} />
        <span>I applied!</span>
      </div>
      <div
        className={`status-checkbox clickable wary-orange-bg white-text no-click-child`}
        onClick={onClick}
        id="pending">
        <BsHourglassSplit size={15} />
        <span>Haven't applied yet</span>
      </div>
      <div
        className={`status-checkbox clickable rufous-bg white-text no-click-child`}
        onClick={onClick}
        id="rejected">
        <FaSadCry size={15} />
        <span>Rejected</span>
      </div>
    </div>
  );
};

export default StatusCheckbox;
