import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";

import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST } from '../reducers/auth'

//Login 로그인
const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      payload: e.response,
    });
  }
}

//LOG_IN_REQUEST가 들어오면 loginUser함수를 실행시켜라라는 뜻 순서 1번
function* watchLoginUser() {
  yield takeLatest(LOG_IN_REQUEST, loginUser);
}


//LogOut 로그아웃
function* logout(action) {
  try {
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
    });
    console.log(e);
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

// Register

const registerUserAPI = (req) => {
  console.log(req, "req");

  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "RegisterUser Data");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeLatest(REGISTER_REQUEST, registerUser);
}

// clear Error

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeLatest(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchregisterUser),
    fork(watchclearError)
  ]);
}
