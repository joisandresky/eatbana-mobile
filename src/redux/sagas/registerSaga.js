import { call, put, takeLatest } from "redux-saga/effects";
import { REGISTER_LOADING, REGISTER_ERROR, REGISTER_SUCCESS, DO_REGISTER } from "../reducers/registerReducer";
import { postRegister } from "../services/authentication";

function* doRegister(payload) {
    yield put({ type: REGISTER_LOADING, isLoading: true });
    try {
        const response = yield call(postRegister, payload.newUser);
        yield put({ type: REGISTER_LOADING, isLoading: false });
        if (response && response.data && response.data._id) {
            payload.onSuccess(response.data);
            yield put({ type: REGISTER_SUCCESS, data: response.data });
        } else {
            payload.onError(response.data);
            yield put({ type: REGISTER_ERROR, error: response.data });
        }
    } catch (err) {
        payload.onError(err);
        yield put({ type: REGISTER_LOADING, isLoading: false });
        yield put({ type: REGISTER_ERROR, error: err });
    }
}

export function* watcherDoRegister() {
    yield takeLatest(DO_REGISTER, doRegister);
}