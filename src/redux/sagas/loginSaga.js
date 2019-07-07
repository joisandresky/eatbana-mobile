import { call, put, takeLatest } from "redux-saga/effects";
import { DO_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOADING_LOGIN, LOGOUT_SUCCESS, START_LOGOUT, FETCHED_USER_DATA, GET_USER_DATA } from "../reducers/loginReducer";
import { postLogin } from "../services/authentication";
import { AsyncStorage } from "react-native";

function* doLogin(payload) {
    yield put({ type: LOADING_LOGIN, isLoading: true });
    try {
        const response = yield call(postLogin, payload.user);
        yield put({ type: LOADING_LOGIN, isLoading: false });
        if (response && response.data && response.data.token) {
            yield call(AsyncStorage.setItem, 'token', JSON.stringify(response.data.token));
            yield call(AsyncStorage.setItem, 'userData', JSON.stringify(response.data.user));
            payload.onSuccess(response.data);
            yield put({ type: LOGIN_SUCCESS, data: response.data });
        } else {
            payload.onError(response.data);
            yield put({ type: LOGIN_ERROR, error: response.data });
        }
    } catch (err) {
        payload.onError(err);
        yield put({ type: LOADING_LOGIN, isLoading: false });
        yield put({ type: LOGIN_ERROR, error: err });
    }
}

function* doLogout(payload) {
    yield call(AsyncStorage.multiRemove, ['userData', 'token']);
    payload.loggedOut(true);
    yield put({ type: LOGOUT_SUCCESS });
}

// Belum digunakan
function* getUserAuth() {
    const userData = yield call(AsyncStorage.getItem, 'userData');
    const token = yield call(AsyncStorage.getItem, 'token');

    yield put({ type: FETCHED_USER_DATA, token, user: userData });
}

export function* watcherLogin() {
    yield takeLatest(DO_LOGIN, doLogin)
}

export function* watcherLogout() {
    yield takeLatest(START_LOGOUT, doLogout);
}

// Belum digunakan
export function* watcherGetUserAuthentication() {
    yield takeLatest(GET_USER_DATA, getUserAuth);
}