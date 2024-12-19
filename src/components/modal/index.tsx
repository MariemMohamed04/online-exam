/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, onStartQuiz }) => {
  if (!isModalOpen) return null;
  
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 w-[648px] h-fit rounded-[20px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-medium text-[#0F0F0F]">Instructions</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mb-12">
          <ul className="list-disc list-inside text-[#535353] text-xl font-medium">
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
          </ul>
        </div>
        <div className="">
          <button
            type="button"
            onClick={onStartQuiz}
            className="bg-[#4461F2] w-[600px] h-[48px] rounded-[100px] text-white"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
