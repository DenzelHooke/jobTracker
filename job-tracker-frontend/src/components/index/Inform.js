import React from 'react';
import InformItem from './InformItem';
import { BsHandThumbsUp, BsFillShieldLockFill, BsClock } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

const iconSize = 40;

const items = [
  {
    title: 'Intuitive UI',
    icon: <BsHandThumbsUp fill="#04724D" size={iconSize} />,
    bgColor: 'rgba(27, 191, 136, 0.2)',
    body: 'Designed to be user-friendly, allowing you to concentrate on the task at hand rather than the mechanics of how to use it.',
  },
  {
    title: 'Shielded Data',
    icon: <BsFillShieldLockFill fill="rgba(8, 124, 247)" size={iconSize} />,
    bgColor: 'rgba(8, 124, 247, 0.2)',
    body: 'Your private job information is kept secure on encrypted AWS servers, which helps prevent attackers from accessing it.',
  },
  {
    title: 'Prioritize Time',
    icon: <BsClock fill="rgba(133, 112, 248)" size={iconSize} />,
    bgColor: 'rgba(133, 112, 248, 0.2)',
    body: "Improve skills, land desired job: Don't let application tracking consume your time!",
  },
];
const Inform = () => {
  return (
    <div className="inform section">
      <div className="max-container">
        <h2 className="title">
          The benefits are <span className="boldText">amazing!</span>
        </h2>
        <div className="utility">
          {items.map((item) => (
            <InformItem
              key={uuidv4()}
              title={item.title}
              icon={item.icon}
              bgColor={item.bgColor}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inform;
