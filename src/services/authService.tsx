/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Swal from "sweetalert2";
// import { getAuthToken } from "@utils/getAuthToken";
import Cookies from 'js-cookie';
import axios from "axios";
import { useSession } from "next-auth/react";
import signUpInfo from '@/interfaces/ISignUpInfo'
import ISignUpInfo from "@/interfaces/ISignUpInfo";

// For Sign In
// export async function signin(email: string, password: string) {
//   const res = await fetch("https://exam.elevateegy.com/api/v1/auth/signin", {
//     body: JSON.stringify({ email, password }),
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const user = await res.json();
//   if (!user || !user?.user?.email) {
//     throw new Error("Authentication failed");
//   }
//   return user;
// }

// For Sign Up
export async function signup(signUpInfo: ISignUpInfo) {
try {
  const res = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", {
    signUpInfo
  });
  console.log(res.data);
  return res;
} catch (error) {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || "Something went wrong.";
    return Promise.reject(errorMessage);
  } else {
    return Promise.reject("An unexpected error occurred.");
  }
}


}

// For Forgot Password
export async function forgotPassword(email: string) {
  try {
    const res = await axios.post(
      "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
      { email }
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      return Promise.reject(errorMessage);
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
}
export async function verifyResetCode(resetCode: any) {
  debugger;
  try {
    const res = await axios.post(
      "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
      { resetCode }
    );
    return res;
  } catch (error: any) {
    return Promise.reject(error.response?.data || error.message);
  }
}



// For Reset Password
export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch("https://exam.elevateegy.com/api/v1/auth/reset-password", {
    body: JSON.stringify({ token, newPassword }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();
  if (!response?.success) {
    throw new Error("Failed to reset password");
  }
  return response;
}

// For Sign Out
export async function signout() {
  const token = Cookies.get("auth_token"); // Get token from cookies

  if (!token) {
    Swal.fire({
      title: "Error",
      text: "No valid session token found. Please sign in again.",
      icon: "error",
    });
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to sign out.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch("https://exam.elevateegy.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Swal.fire({
          title: "Signed out",
          text: "You have successfully signed out.",
          icon: "success",
        });

        // Clear the token from cookies
        Cookies.remove("auth_token");
        window.location.href = "/signin";
      } else {
        throw new Error("Sign out failed");
      }
    } catch (error) {
      // Narrowing the type of 'error' safely
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  }
}

// export default async function GetProfileData() {
//   const { data: session } = useSession();
//   const response = await axios.get("https://exam.elevateegy.com/api/v1/auth/profileData",
//     {
//       headers: {
//         token: `${session.token}`,
//       }
//     }
//   );
// }