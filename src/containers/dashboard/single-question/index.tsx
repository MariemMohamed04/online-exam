/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

interface Answer {
  answer: string;
  key: string;
}

interface Question {
  _id?: string;
  question?: string;
  answers?: Answer[];
}

interface SingleQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answerKey: string) => void;
}

export default function SingleQuestion({ question, selectedAnswer, onAnswerSelect }: SingleQuestionProps) {
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedKey = event.target.value;
    onAnswerSelect(selectedKey);
  };

  return (
    <div>
      <h2 className='text-[#0F0F0F] font-medium mb-6 text-2xl'>{question.question}</h2>
      <ul className="mb-12">
        {question.answers?.map((answer, index) => (
          <li key={index} className="flex items-center bg-[#EDEFF3] p-5 mb-4 rounded-[10px] text-xl font-normal text-[#0F0F0F]">
            <input
              type="radio"
              id={`custom-radio-${index}`}
              name={`question-${question._id}`}
              value={answer.key}
              checked={selectedAnswer === answer.key}
              onChange={handleAnswerChange}
              className="mr-2"
            />
            <label htmlFor={`${question._id}-answer-${index}`} className="text-gray-700">
              {answer.answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
