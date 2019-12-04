import { takeLatest, put } from "redux-saga/effects";
import { setTokenAction } from "./GlobalProvider";

const LOGIN = "LOGIN_GLOBAL_SAGA";
const LOGOUT = "LOGOUT_GLOBAL_SAGA";

export const loginAction = () => ({
  type: LOGIN,
  token: "dfkljsdkfhdsn fuwebvu 09324vm3294,clipumtbvp,to"
});

export const logoutAction = () => ({
  type: LOGOUT
});

function* handleLogin(actions) {
  yield put(setTokenAction(actions.token));
}

function* handleLogout() {
  yield put(setTokenAction(null));
}

export default function* watchGlobal() {
  yield takeLatest(LOGIN, handleLogin);
  yield takeLatest(LOGOUT, handleLogout);
}
