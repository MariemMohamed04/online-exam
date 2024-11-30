/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FieldComponent from '@components/Field/index';
import ButtonComponent from '@/components/Button';
import { useRouter } from 'next/navigation';
import { verifyResetCode } from '@/services/authService';
import Swal from 'sweetalert2';


const validationSchema = Yup.object({
  resetCode: Yup.string()
    .required("Reset Code is required")
});

export default function VerifyCode() {
  const router = useRouter();
  return (
    <>
    <div className="flex flex-col gap-8 justify-center items-center h-full">
<Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          debugger;
          try {
            const { resetCode } = values;
            const res = await verifyResetCode(resetCode);

            if (res.data.status === "Success") {
              Swal.fire({
                title: "Success",
                text: "Code has been verified successfully",
                icon: "success",
              }).then(() => {
                router.push(res.data.url || "/");
              });
            } else {
              throw new Error("Failed to verify code.");
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
            <p className="font-semibold text-lg">Verify Code</p>

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
            <ButtonComponent type="submit" text="Verify" />
          </Form>
        )}
      </Formik>
    </div>
    </>
  )
}
