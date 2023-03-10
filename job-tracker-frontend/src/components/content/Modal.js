import { useEffect, useState, useRef } from 'react';

const Modal = ({ content, setModal, className }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      //   window.alert('You clicked outside of the modal');
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    document.getElementById('layout').classList.add('modal-background');

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.getElementById('layout').classList.remove('modal-background');
    };
  }, []);

  return (
    <div ref={modalRef} className={`modal panel round-panel ${className}`}>
      {content}
    </div>
  );
};

export default Modal;
