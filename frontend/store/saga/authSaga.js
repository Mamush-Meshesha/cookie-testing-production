import { call, put, takeLatest } from "redux-saga/effects";
import { login, fetchUser } from "../../utils/api";
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess, loginFailure, loginRequest } from "../redux/authSlice";


function* loginSaga(action) {
  try {
    yield call(login, action.payload);
    yield put(fetchUserRequest()); 
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* fetchUserSaga() {
  try {
    const { data } = yield call(fetchUser);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserFailure(error.response?.data?.message || "Failed to fetch user"));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest, loginSaga);
  yield takeLatest(fetchUserRequest, fetchUserSaga);
}
