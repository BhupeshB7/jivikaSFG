// BackButton.js
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <FaArrowLeft onClick={handleBackClick} className='bg-slate-700 text-white p-3 h-10 w-10 rounded-full cursor-pointer absolute top-3 right-3'>
      Go Back
    </FaArrowLeft>
  );
};

export default BackButton;
