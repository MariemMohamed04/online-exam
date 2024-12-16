import Question from "@/interfaces/IQuestion";

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';


interface FetchQuestionsRequestAction {
  type: typeof FETCH_QUESTIONS_REQUEST;
  payload: string;
}

interface FetchQuestionsSuccessAction {
  type: typeof FETCH_QUESTIONS_SUCCESS;
  payload: Question[];
}

interface FetchQuestionsFailureAction {
  type: typeof FETCH_QUESTIONS_FAILURE;
  payload: string; // Error message
}

export type QuestionsActionTypes =
  | FetchQuestionsRequestAction
  | FetchQuestionsSuccessAction
  | FetchQuestionsFailureAction;
