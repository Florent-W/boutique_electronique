import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-center w-12 h-12 bg-red-800 text-white rounded-full hover:bg-black transition duration-150 ease-in-out"
      aria-label="Retour"
    >
    <i className="ri-arrow-left-line"></i>
    </button>
  );
};

export default BackButton;
