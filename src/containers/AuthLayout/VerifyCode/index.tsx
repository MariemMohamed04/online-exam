/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from '@components/Field/index';
import ButtonComponent from '@/components/Button';
import { useRouter } from 'next/navigation';
import { verifyResetCode } from '@/services/authService';
import Link from 'next/link';
import Loading from '@/components/Loading';


const validationSchema = Yup.object({
  resetCode: Yup.string()
    .required("Reset Code is required")
});

export default function VerifyCode() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    const { resetCode } = values;
    try {
      setLoading(true);
      await verifyResetCode(resetCode);
      router.push('/resetPassword');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <div className="flex flex-col gap-8 justify-center items-center h-full">
<Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6">            
            <div className="form-field">
              <FieldComponent
                name="resetCode"
                type="text"
                placeholder="Enter Code"
                className={`${errors.resetCode && touched.resetCode ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="text-right">
            Didn’t receive a code?
              <Link href={'/forgotPassword'} className='pl-1 text-[#4461F2]'>Resend</Link>
            </div>
            {isLoading ? (
                <Loading />
              ) : (
            <ButtonComponent type="submit" text="Verify" />
              )}
          </Form>
        )}
      </Formik>
    </div>
    </>
  )
}
