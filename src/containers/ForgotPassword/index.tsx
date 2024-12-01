/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FieldComponent from '@components/Field/index';
import ButtonComponent from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { forgotPassword } from '@/services/authService';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading';


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
});
export default function ForgotPassword() {

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    const { email } = values;
    try {
      setLoading(true);
      await forgotPassword(email);
      router.push('/verifyCode');
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
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6">
            <div className="form-field">
              <FieldComponent
                name="email"
                type="email"
                placeholder="Email"
                className={`${errors.email && touched.email ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {isLoading ? (
                <Loading />
              ) : (
            <ButtonComponent type="submit" text="Send Code" />
              )}
          </Form>
        )}
      </Formik>
    </div>
</>
  );
}
