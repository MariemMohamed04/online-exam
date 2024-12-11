/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"
import Swal from "sweetalert2";
// import { getAuthToken } from "@utils/getAuthToken";
import Cookies from 'js-cookie';
import axios from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import signUpInfo from '@/interfaces/ISignUpInfo'
import ISignUpInfo from "@/interfaces/ISignUpInfo";
import { useRouter } from "next/navigation";
import IAuthInfo from "@/interfaces/IAuthInfo";
import { signOut as nextAuthSignOut } from "next-auth/react";



// For Sign In
export async function signin(signInInfo: IAuthInfo) {
  try {
    const res = await signIn("credentials", {
      ...signInInfo,
      callbackUrl: "/dashboard/home",
      redirect: false,
    });
    Swal.fire({
      title: "Success",
      text: "Signing in succeeded",
      icon: "success",
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
      return Promise.reject(errorMessage);
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
}


// For Sign Up
export async function signup(signUpInfo: ISignUpInfo) {
  try {
    const res = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", signUpInfo);
    console.log(res.data);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Account created successfully!',
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
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
    Swal.fire({
      icon: 'success',
      title: 'Code sent successfully',
      text: 'OTP sent to your email',
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Swal.fire({
        icon: 'error',
        title: 'Code sending failed',
        text: errorMessage,
      });
      return Promise.reject(errorMessage);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Password Reset Failed',
        text: 'An unexpected error occurred.',
      });
      return Promise.reject("An unexpected error occurred.");
    }
  }
}


// For Verify Code
export async function verifyResetCode(resetCode: any) {
  try {
    const res = await axios.post(
      "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
      { resetCode }
    );
    Swal.fire({
      icon: 'success',
      title: 'Code Verified',
      text: 'Your code has been verified',
    });
    return res;
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Verify Code Failed',
      text: 'Please, enter correct code.',
    });
    return Promise.reject(error.response?.data || error.message);
  }
}


// For Reset Password
export async function resetPassword(email: string, newPassword: string) {
  try {
    const res = await axios.put(
      'https://exam.elevateegy.com/api/v1/auth/resetPassword',
      { email, newPassword }
    );
    Swal.fire({
      icon: 'success',
      title: 'Password Reset Successful',
      text: 'Your password has been reset successfully.',
    });
    return res;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || 'Something went wrong.';
    }
    Swal.fire({
      icon: 'error',
      title: 'Password Reset Failed',
      text: errorMessage,
    });
    return Promise.reject(errorMessage);
  }
}

// For Sign Out
export function useSignout() {
  const { data: session } = useSession();

  const signout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to sign out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    Swal.fire({
      title: "Token",
      text: session?.token,
      icon: "info",
    });


    if (result.isConfirmed) {
      try {
        const res = await axios.get("https://exam.elevateegy.com/api/v1/auth/logout", {
          headers: { token: session?.token },
        });
        if (res.status >= 200 && res.status < 300) {
          Swal.fire({
            title: "Signed out",
            text: "You have successfully signed out.",
            icon: "success",
          });
          return res;
        } else {
          throw new Error("Sign out failed");
        }
      } catch (error) {
        let errorMessage = "An unexpected error occurred.";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || "Something went wrong.";
        }
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      }
    }
  };

  return { signout };
}

export async function signOut() {
  try {
    const session = await getSession();
  console.log("Session:", session?.token);
  const data = await axios.get("https://exam.elevateegy.com/api/v1/auth/logout", {
    headers: { token: session?.token },
  });
console.log('Data:', data);
nextAuthSignOut({ redirect: false });
    document.cookie = "next-auth.session-token=; Max-Age=0; path=/;";
  return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
      return Promise.reject(errorMessage);
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
}
