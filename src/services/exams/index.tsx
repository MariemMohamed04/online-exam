/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from "@/utils/consts";
import axios from "axios";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";

export async function fetchExams() {
  try {
    const session = await getSession();
  console.log("Session:", session?.token);
  const { data } = await axios.get(`${baseUrl}/exams`, {
    headers: { token: session?.token },
  });
console.log('Exams:', data.exams);
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

export async function fetchExamsOnSubject(id: string) {
  try {
    const session = await getSession();
  console.log("Session:", session?.token);
  const { data } = await axios.get(`${baseUrl}/exams?subject=${id}`, {
    headers: { token: session?.token },
  });
console.log('Exams on Subject:', data.exams);
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
