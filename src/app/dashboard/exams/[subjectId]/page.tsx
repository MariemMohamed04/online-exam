"use client";
import Exams from '@/containers/dashboard/exams';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ExamsPage() {
  const params = useParams();
  const subjectId = params?.subjectId;

  return (
    <>
      {subjectId ? <Exams subjectId={subjectId} /> : <p>Subject not found.</p>}
    </>
  );
}

