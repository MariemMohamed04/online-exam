// "use client"

import axios from "axios";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";

export async function fetchSubjects() {
  try {
    const session = await getSession();
  console.log("Session:", session?.token);
  const { data } = await axios.get("https://exam.elevateegy.com/api/v1/subjects", {
    headers: { token: session?.token },
  });
console.log('Subjects', data.subjects);
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