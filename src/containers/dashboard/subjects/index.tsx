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
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 bg-pink-300`}>
          {subjects.length === 0 ? (
            <p>No subjects available</p>
          ) : (
            subjects.map((subject, index) => (
              <SingleSubject subjects={subject} key={index} />
            ))
          )}
        </div>
      )}
    </>
  );
}
/*



<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="">
    </div>
</div>


*/