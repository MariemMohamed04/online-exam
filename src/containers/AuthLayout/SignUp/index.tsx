/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { signup } from "@/services/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";


const validationSchema = Yup.object({
  username: Yup.string()
  .min(3, "Username must be at least 3 characters long")
  .required("Username is required"),
  firstName: Yup.string()
  .min(3, "First name must be at least 3 characters long")
  .required("First name is required"),
  lastName: Yup.string()
  .min(3, "Last name must be at least 3 characters long")
  .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
  )
  .required("Password is required"),
    rePassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),  
  phone: Yup.string()
    .typeError("Phone number must be a valid number")
    .matches(
      /^01[0125][0-9]{8}$/,
      "Phone number must start with 01 followed by 0, 1, 2, or 5 and contain 11 digits in total"
    )
    .required("Phone number is required"),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);
      const response = await signup(values);
      console.log(response);
      resetForm();
      router.push("/signin");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <div>

<Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          rePassword: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6">
            <div className="form-field">
              <FieldComponent
                name="username"
                type="text"
                placeholder="Username"
                className={`${errors.username && touched.username ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="form-field">
              <FieldComponent
                name="firstName"
                type="text"
                placeholder="First Name"
                className={`${errors.firstName && touched.firstName ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="form-field">
              <FieldComponent
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={`${errors.lastName && touched.lastName ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
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
            <div className="form-field">
              <Field
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                className={`${errors.rePassword && touched.rePassword ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="form-field">
              <Field
                type="tel"
                name="phone"
                placeholder="Phone"
                className={`${errors.phone && touched.phone ? 'input-error' : ''}`}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="text-center">
              Already have an account? 
              <Link
                href={"/signin"}
                className="px-2"
              >Login</Link>
            </div>
            {isLoading ? (
                <Loading />
              ) : (
            <ButtonComponent type="submit" text="Create Account" />
              )}
          </Form>
        )}
      </Formik>
    </div>
    
    </>
  )
}
