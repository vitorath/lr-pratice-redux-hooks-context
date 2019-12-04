import { takeLatest, delay, put } from "redux-saga/effects";
import { successAction } from "./FormProvider";

const REQUEST = "REQUEST_FORM_SAGA";
const CANCEL_REQUEST = "CANCEL_REQUEST_FORM_SAGA";

export const requestAction = () => ({
  type: REQUEST
});

export const cancelRequestAction = () => ({
  type: CANCEL_REQUEST
});

function* handleRequest() {
  yield delay(2000);
  yield put(successAction());
}

export default function* watchForm() {
  yield takeLatest(REQUEST, handleRequest);
}
