/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FieldComponent from '@components/Field/index';
import ButtonComponent from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { forgotPassword } from '@/services/authService';
import Swal from 'sweetalert2';


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
});
export default function ForgotPassword() {

  const router = useRouter();

  return (
<>
<div className="flex flex-col gap-8 justify-center items-center h-full">
<Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const { email } = values;
            const res = await forgotPassword(email);

            if (res.data.message === "success") {
              Swal.fire({
                title: "Success",
                text: "Code has been sent to your email.",
                icon: "success",
              }).then(() => {
                router.push(res.data.url || "/verifyCode");
              });
            } else {
              throw new Error("Failed to send the code.");
            }
          } catch (error: any) {
            Swal.fire({
              title: "Error",
              text: error.message || "Something went wrong.",
              icon: "error",
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">Forgot you Password?</p>

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
            <ButtonComponent type="submit" text="Send Code" />
          </Form>
        )}
      </Formik>
    </div>
</>
  );
}
