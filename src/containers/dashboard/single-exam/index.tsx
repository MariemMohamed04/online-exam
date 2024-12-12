/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

interface Exam {
  _id?: string;
  title?: string;
  duration?: number;
  numberOfQuestions?: number;
  active?: boolean;
}

interface SingleExamProps {
  exams: Exam;
}
export default function SingleExam({ exams }: SingleExamProps) {

  return (
    <>

    <div className="rounded-[10px] h-[103px] py-4 px-6 shadow-[0px_15px_40px_0px_rgba(42,41,41,0.05)] flex items-center justify-between bg-white mb-6">
    <div className="">
      <h6 className='text-base font-medium'>{exams.title}</h6>
      <span className='text-[13px] font-normal'>{exams.numberOfQuestions} Question</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <span className='text-[13px] font-normal'>{exams.duration} Minutes</span>
      <div className="bg-[#4461F2] flex items-center justify-center w-[77px] h-[23px] rounded-[10px] py-1 px-6 mt-2">
      <button className='text-xs text-white font-medium' type="submit">Start</button>
      </div>
    </div>
    </div>
    </>
  )
}


