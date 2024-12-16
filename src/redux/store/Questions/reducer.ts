import * as types from './types';
import Question from "@/interfaces/IQuestion";

interface QuestionsState {
  loading: boolean;
  questions: Question[];
  error: string | null;
}

const initialState: QuestionsState = {
  loading: false,
  questions: [],
  error: null,
};

export const questionsReducer = (
  state = initialState,
  action: types.QuestionsActionTypes
): QuestionsState => {
  switch (action.type) {
    case types.FETCH_QUESTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_QUESTIONS_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case types.FETCH_QUESTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
