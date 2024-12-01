/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldComponent from '@components/Field/index';
import ButtonComponent from "@/components/Button";
import { resetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";
import { getSession, signIn } from "next-auth/react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
    rePassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm password is required"),  
});

export default function ResetPasswordForm() {

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    const { email, newPassword } = values;
    try {
      setLoading(true);
      const res = await resetPassword(email, newPassword);
      if (res.data.message === "success" && res.data.token) {
        await signIn("credentials", {
          token: res.data.token,
          callbackUrl: "/client",
          redirect: false,
        });
  
        console.log("Token successfully set in session");
      }
      router.push('/client');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="">
    <Formik
        initialValues={{
          email: "",
          newPassword: "",
          rePassword: "",
        }}
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

            <div className="form-field">
              <Field
                type="password"
                name="newPassword"
                placeholder="New Password"
                className={`${errors.newPassword && touched.newPassword ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="form-field">
              <Field
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                className={`${errors.rePassword && touched.rePassword ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {isLoading ? (
                <Loading />
              ) : (
                <ButtonComponent type="submit" text="Reset Password" />
              )}
          </Form>
        )}
      </Formik>
    </div>
    </>
  )
}
