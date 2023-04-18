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
          <div className="input-wrapper">
            <label htmlFor="">Upload Document</label>
            <input type="file" id="resume" onChange={onChange} />
          </div>
          {/* {<BsUpload size={iconSize} />} */}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
