/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Loading from '@/components/Loading';
import { FailToaster, SuccessToaster } from '@/components/toasters';
import { fetchExams, fetchExamsOnSubject } from '@/services/exams';
import React, { useEffect, useState } from 'react'
import SingleExam from '../single-exam';
import { useParams } from 'next/navigation';
// import CountDown from '@/utils/countdown';


interface Exam {
  _id?: string;
  title?: string;
}

interface ExamsProps {
  exam: Exam[];
}

export default function Exams({ subjectId }: { subjectId: string }) {
    const [exams, setExams] = useState<Exam[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [toasterMessage, setToasterMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const frontendQuiz = ["HTML Quiz", "CSS Quiz", "Javascript Quiz"];
    const frameworkQuiz = ["React Quiz", "Angular Quiz"];

    useEffect(() => {
      getExams();
    }, []);
  
    async function getExams() {
      try {
        setIsLoading(true);
        const res = await fetchExamsOnSubject(subjectId);
        console.log(res);
        setToasterMessage("Exams loaded successfully");
        setIsSuccess(true);
        setExams(res?.exams || []);
      } catch (error) {
        setToasterMessage("Failed to get Exams");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setToasterMessage(null);
          setIsSuccess(null);
        }, 3000);
      }
    }

    const frontendExams = exams.filter((exam) => frontendQuiz.includes(exam.title || ""));
  const frameworkExams = exams.filter((exam) => frameworkQuiz.includes(exam.title || ""));

  return (
<>
<div className="w-[1063px] mb-9">
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
        <div>
          {frontendExams.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-[#0F0F0F] text-[18px] mb-6">Front-End Quiz</h4>
              {frontendExams.map((exam, index) => (
                <SingleExam exams={exam} key={index} />
              ))}
            </div>
          )}
          {frameworkExams.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-[#0F0F0F] text-[18px] mb-6">Framework Quiz</h4>
              {frameworkExams.map((exam, index) => (
                <SingleExam exams={exam} key={index} />
              ))}
            </div>
          )}
          {frontendExams.length === 0 && frameworkExams.length === 0 && (
            <p className='font-medium text-[#0F0F0F] text-[18px]'>No exams available</p>
          )}
        </div>
      )}
    </div>
    {/* <CountDown/> */}
</>
  );
}

