/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { getSession, signIn } from "next-auth/react";
import FieldComponent from '@components/Field/index';
import Link from "next/link";
import { useState } from "react";
import ButtonComponent from "@/components/Button";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function SignInForm() {

  const [rememberMe, setRememberMe] = useState(false);



  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { email, password } = values;

          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/",
          });
          if (result?.ok) {
            const session = await getSession();
            const token = session?.token;

            if (token) {
              const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;

              if (rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem("expiryTime", expiryTime.toString());
              } else {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("expiryTime", expiryTime.toString());
              }

              Swal.fire({
                title: "Success",
                text: "Signing in succeeded",
                icon: "success",
              }).then(() => {
                window.location.href = result.url || "/";
              });
            }
          } else {
            Swal.fire({
              title: "Error",
              text: "Signing in failed",
              icon: "error",
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">Sign in</p>

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
                name="password"
                placeholder="Password"
                className={`${errors.password && touched.password ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="form-field flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              <Link
                href={"/forgotPassword"}
              >Recover Password?</Link>
            </div>
            <ButtonComponent type="submit" text="Sign in" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

