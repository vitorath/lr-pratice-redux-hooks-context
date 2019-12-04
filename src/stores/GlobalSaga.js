import { takeLatest, cancel, delay, put } from "redux-saga/effects";
import { setTokenAction } from "./GlobalProvider";

const LOGIN = "LOGIN_GLOBAL_SAGA";
const WAIT_USER_ACTION = "WAIT_USER_ACTION_GLOBAL_SAGA";
const USING_SYSTEM = "USING_SYSTEM_GLOBAL_SAGA";
const LOGOUT = "LOGOUT_GLOBAL_SAGA";

export const loginAction = () => ({
  type: LOGIN,
  token: "dfkljsdkfhdsn fuwebvu 09324vm3294,clipumtbvp,to"
});

export const logoutAction = () => ({
  type: LOGOUT
});

export const waitUserAction = () => ({
  type: WAIT_USER_ACTION,
  time: 30000
});

export const usingSystemAction = () => ({
  type: USING_SYSTEM
});

function* handleLogin(actions) {
  yield put(setTokenAction(actions.token));
}

function* handleLogout(actions) {
  yield put(setTokenAction(null));
}

function* handleWaitUser(actions) {
  yield delay(actions.time);
  yield put(logoutAction());
}

function* handleUsingSystem(task) {
  yield cancel(task);
  yield put(usingSystemAction());
}

export default function* watchGlobal() {
  yield takeLatest(LOGIN, handleLogin);
  yield takeLatest(LOGOUT, handleLogout);
  const waitUser = yield takeLatest(WAIT_USER_ACTION, handleWaitUser);
  yield takeLatest(USING_SYSTEM, handleUsingSystem, waitUser);
}
