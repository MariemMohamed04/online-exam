import * as types from './types';
import Question from "@/interfaces/IQuestion";

export const fetchQuestionsRequest = (examId: string) => ({
  type: types.FETCH_QUESTIONS_REQUEST,
  payload: examId,
});

export const fetchQuestionsSuccess = (questions: Question[]) => ({
  type: types.FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = (error: string) => ({
  type: types.FETCH_QUESTIONS_FAILURE,
  payload: error,
});
