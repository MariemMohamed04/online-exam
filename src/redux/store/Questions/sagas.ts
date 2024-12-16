/* eslint-disable @typescript-eslint/no-explicit-any */
import Question from '@/interfaces/IQuestion';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { fetchQuestionsOnExam } from '@/services/questions';

function* fetchQuestionsSaga(action: { type: string; payload: string }) {
  try {
    const questions: Question[] = yield call(fetchQuestionsOnExam, action.payload);
    yield put(actions.fetchQuestionsSuccess(questions));
  } catch (error: any) {
    yield put(actions.fetchQuestionsFailure(error));
  }
}

export function* QuestionsSagas() {
  yield takeLatest(types.FETCH_QUESTIONS_REQUEST, fetchQuestionsSaga);
}
