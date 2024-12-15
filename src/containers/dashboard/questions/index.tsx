/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Loading from '@/components/Loading';
import { FailToaster, SuccessToaster } from '@/components/toasters';
import { fetchQuestionsOnExam } from '@/services/questions';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SingleQuestion from '../single-question';

interface Answer {
  answer: string;
  key: string;
}

interface Question {
  _id?: string;
  question?: string;
  answers?: Answer[];
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasterMessage, setToasterMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});

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
    if (selectedAnswers[questions[currentQuestionIndex]._id || ''] && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
              <Image src={'/images/clock.png'} alt='clock' width={24} height={30} className='pr-[3px]' />
              <div className='text-[#11CE19] font-normal text-xl'>14.59</div>
            </div>
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
              <div className="">
                <SingleQuestion
                  question={questions[currentQuestionIndex]}
                  selectedAnswer={selectedAnswers[questions[currentQuestionIndex]._id || '']}
                  onAnswerSelect={handleAnswerSelect}
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              type="button"
              className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              type="button"
              className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${!selectedAnswers[questions[currentQuestionIndex]?._id || ''] || currentQuestionIndex === questions.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                }`}
              disabled={!selectedAnswers[questions[currentQuestionIndex]?._id || ''] || currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
