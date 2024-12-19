/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Modal from "@/components/modal";
import Questions from "@/containers/dashboard/questions";
import { useDispatch } from 'react-redux';
import { fetchQuestionsRequest } from '@/redux/store/Questions/actions';
import Exam from "@/interfaces/IExam";

interface SingleExamProps {
  exams: Exam;
}

export default function SingleExam({ exams }: SingleExamProps) {
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleStartQuiz = () => {
    if (exams._id) {
      dispatch(fetchQuestionsRequest(exams._id));
    }
    setIsInstructionModalOpen(false);
    setIsQuestionsModalOpen(true);
  };

  const closeQuestionsModal = () => {
    setIsQuestionsModalOpen(false);
  };

  return (
    <>
      <div className="rounded-[10px] h-[103px] py-4 px-6 shadow-[0px_15px_40px_0px_rgba(42,41,41,0.05)] flex items-center justify-between bg-white mb-6">
        <div>
          <h6 className="text-base font-medium">{exams.title}</h6>
          <span className="text-[13px] font-normal">
            {exams.numberOfQuestions} Questions
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[13px] font-normal">{exams.duration} Minutes</span>
          <div className="bg-[#4461F2] flex items-center justify-center w-[77px] h-[23px] rounded-[10px] py-1 px-6 mt-2">
            <button
              className="text-xs text-white font-medium"
              onClick={() => setIsInstructionModalOpen(true)}
              type="button"
            >
              Start
            </button>
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={isInstructionModalOpen}
        onClose={() => setIsInstructionModalOpen(false)}
        onStartQuiz={handleStartQuiz}
      />

      {isQuestionsModalOpen && <Questions />}
    </>
  );
}
