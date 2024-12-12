/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Loading from '@/components/Loading';
import { FailToaster, SuccessToaster } from '@/components/toasters';
import { fetchSubjects } from '@/services/subjects';
import React, { useEffect, useState } from 'react';
import SingleSubject from '../single-subject';

interface Subject {
  id?: number;
  name?: string;
}

interface SubjectsProps {
  subject: Subject[];
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasterMessage, setToasterMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    getSubjects();
  }, []);

  async function getSubjects() {
    try {
      setIsLoading(true);
      const res = await fetchSubjects();
      console.log(res);
      setToasterMessage("Subjects loaded successfully");
      setIsSuccess(true);
      setSubjects(res?.subjects);
    } catch (error) {
      setToasterMessage("Failed to get Subjects");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToasterMessage(null);
        setIsSuccess(null);
      }, 3000);
    }
  }

  return (
    <>
      <div className="w-[1063px] bg-white rounded-[20px] py-8 px-4 shadow-[0px_15px_40px_0px_rgba(0,0,0,0.05)] mb-9">
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
              <div className="flex items-center justify-between mb-6">
                <h4 className='font-medium text-[#4461F2] text-[24px]'>Quizzes</h4>
                <h4 className='font-medium text-[#4461F2] text-[24px]'>View all</h4>
              </div>
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
                {subjects.length === 0 ? (
                  <p>No subjects available</p>
                ) : (
                  subjects.map((subject, index) => (
                    <SingleSubject subjects={subject} key={index} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
