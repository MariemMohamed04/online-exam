import { baseUrl } from "@/utils/consts";
import axios from "axios";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";

export async function fetchQuestionsOnExam(id: string) {
  try {
    const session = await getSession();
    console.log("Session:", session?.token);
    const { data } = await axios.get(`${baseUrl}/questions?exam=${id}`, {
      headers: { token: session?.token },
    });
    console.log('Questions on Exam:', data.questions);
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