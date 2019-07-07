import { put, call, takeLatest } from "redux-saga/effects";
import { LOADING_GET_GUEST, ERR_FETCHED_GUEST, GET_GUEST, FETCHED_GUEST } from "../reducers/guestReducer";
import { getGuest } from "../services/guest";

function* doGetGuest(payload) {
    yield put({ type: LOADING_GET_GUEST, isLoading: true });
    try {
        const response = yield call(getGuest, payload.id);
        yield put({ type: LOADING_GET_GUEST, isLoading: false });
        if (response && response.data && response.data._id) {
            yield put({ type: FETCHED_GUEST, guest: response.data });
        } else {
            yield put({ type: ERR_FETCHED_GUEST, error: response.data });
        }
    } catch (err) {
        payload.onError(err);
        yield put({ type: LOADING_GET_GUEST, isLoading: false });
        yield put({ type: ERR_FETCHED_GUEST, error: err });
    }
}

export function* watcherGetGuest() {
    yield takeLatest(GET_GUEST, doGetGuest);
}