import { all } from "redux-saga/effects";
import { QuestionsSagas } from "./Questions/sagas";

export default function* rootSaga() {
  yield all([
    QuestionsSagas
  ]);
}