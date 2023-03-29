import { useEffect, useState, useRef } from 'react';
import { BsUpload } from 'react-icons/bs';

const FileUpload = ({ formFiles, setFormFiles }) => {
  const iconSize = 33;

  const onChange = (e) => {
    setFormFiles((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.files[0],
    }));
    // console.log(e.target.files);
  };

  return (
    <>
      <div className="file-upload-wrapper">
        <div className="file-upload box__dragndrop">
          <input type="file" id="resume" onChange={onChange} />
          {<BsUpload size={iconSize} />}
          <p>Select a PDF file to upload</p>
          <span>Or drag & drop it here</span>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
