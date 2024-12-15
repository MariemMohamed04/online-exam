import React, { useState } from 'react';
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

const questions: Question[] = [
  {
    _id: '1',
    question: 'What is your favorite color?',
    answers: [
      { answer: 'Red', key: 'A' },
      { answer: 'Blue', key: 'B' },
      { answer: 'Green', key: 'C' },
      { answer: 'Yellow', key: 'D' },
    ],
  },
  {
    _id: '2',
    question: 'What is your favorite animal?',
    answers: [
      { answer: 'Cat', key: 'A' },
      { answer: 'Dog', key: 'B' },
      { answer: 'Bird', key: 'C' },
      { answer: 'Fish', key: 'D' },
    ],
  },
  {
    _id: '3',
    question: 'What is your favorite season?',
    answers: [
      { answer: 'Spring', key: 'A' },
      { answer: 'Summer', key: 'B' },
      { answer: 'Autumn', key: 'C' },
      { answer: 'Winter', key: 'D' },
    ],
  },
];

export default function QuestionNavigator() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      {/* Display the current question */}
      <SingleQuestion question={questions[currentQuestionIndex]} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handleBack}
          type="button"
          className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${
            currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          type="button"
          className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${
            currentQuestionIndex === questions.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
