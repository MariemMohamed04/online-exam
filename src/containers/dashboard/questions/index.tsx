/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Loading from '@/components/Loading';
import { FailToaster, SuccessToaster } from '@/components/toasters';
import { fetchQuestionsOnExam } from '@/services/questions';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SingleQuestion from '../single-question';
import Question from "@/interfaces/IQuestion";
// import ExamScore from '../exam-score';
import Timer from '@/components/timer';

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasterMessage, setToasterMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(true);
  const [isExamScoreModalOpen, setIsExamScoreModalOpen] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const time = 0.5;

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      setIsLoading(true);
      const res = await fetchQuestionsOnExam("670070a830a3c3c1944a9c63");
      setToasterMessage("Questions loaded successfully");
      setIsSuccess(true);
      setQuestions(res?.questions || []);
      const examDuration = res?.questions[0]?.exam?.duration || 0;
      setDuration(examDuration);
    } catch (error) {
      setToasterMessage("Failed to get Questions");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToasterMessage(null);
        setIsSuccess(null);
      }, 3000);
    }
  }

  const handleNext = () => {
    const currentAnswer = selectedAnswers[questions[currentQuestionIndex]?._id || ""];
    if (currentAnswer && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === questions.length - 1) {
      setIsQuestionsModalOpen(false);
      setIsExamScoreModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (answerKey: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex]._id || '']: answerKey,
    }));
  };

  return (
    <>
      {isQuestionsModalOpen && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 w-[686px] h-fit rounded-[20px]">
            <div className="flex items-center justify-between mb-[27px]">
              <h6 className="text-sm font-medium text-[#4461F2]">
                Question <span>{currentQuestionIndex + 1} of {questions.length}</span>
              </h6>
              <div className="flex">
                <Image src={"/images/clock.png"} alt="clock" width={24} height={30} className="pr-[3px]" />
                <Timer duration={time} />
              </div>
            </div>
            <div className="mb-12">
              <ul className="flex items-center justify-center">
                {questions.map((_, index) => (
                  <li
                    key={index}
                    className={`w-2 h-2 mx-2 rounded-full ${index <= currentQuestionIndex ? "bg-[#4461F2]" : "bg-[#D9D9D9]"
                      }`}
                  ></li>
                ))}
              </ul>
            </div>
            {toasterMessage && (
              isSuccess ? (
                <SuccessToaster message={toasterMessage} />
              ) : (
                <FailToaster message={toasterMessage} />
              )
            )}
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div>
                  <SingleQuestion
                    question={questions[currentQuestionIndex]}
                    selectedAnswer={selectedAnswers[questions[currentQuestionIndex]?._id || ""]}
                    onAnswerSelect={handleAnswerSelect}
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleBack}
                type="button"
                className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                type="button"
                className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${!selectedAnswers[questions[currentQuestionIndex]?._id || ""] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!selectedAnswers[questions[currentQuestionIndex]?._id || ""]}
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
       {/* {isExamScoreModalOpen && <ExamScore />} */}
    </>
  );
}
