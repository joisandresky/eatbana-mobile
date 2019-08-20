import { put, takeLatest, call } from "redux-saga/effects";
import { START_GET_NEARBY, LOADING_STATE, NEARBY_ERROR, NEARBY_SUCCESS, RESTAURANT_ERROR, RESTAURANT_FETCHED, START_GET_RESTAURANT, START_GET_CRITERIA, SET_CRITERIA, CRITERIA_SET } from "../reducers/restaurantReducer";
import { getNearbyService, getRestaurantService, getCriteriaService } from "../services/restaurant";


function* getNearby(payload) {
  yield put({ type: LOADING_STATE, isLoading: true });
  try {
    const response = yield call(getNearbyService, payload.data.page, payload.data.limit, payload.data.lat, payload.data.lng, payload.data.search);
    yield put({ type: LOADING_STATE, isLoading: false });
    if (response && response.data && response.data.restaurant) {
      payload.onSuccess(response.data);
      yield put({ type: NEARBY_SUCCESS, restaurants: response.data.restaurant, total: response.data.total });
    } else {
      payload.onError(response.data);
      yield put({ type: NEARBY_ERROR, error: response.data });
    }
  } catch (err) {
    console.log('err', err.response);
    payload.onError(err);
    yield put({ type: LOADING_STATE, isLoading: false });
    yield put({ type: NEARBY_ERROR, error: err });
  }
}

function* getFindCriteria(payload) {
  console.log('pyload criteria', payload);
  yield put({ type: LOADING_STATE, isLoading: true });
  try {
    const response = yield call(getCriteriaService, payload.data.lat, payload.data.lng, payload.data.body);
    yield put({ type: LOADING_STATE, isLoading: false });
    if (response && response.data) {
      payload.onSuccess(response.data);
      yield put({ type: NEARBY_SUCCESS, restaurants: response.data, total: response.data.total });
    } else {
      payload.onError(response.data);
      yield put({ type: NEARBY_ERROR, error: response.data });
    }
  } catch (err) {
    console.log('err', err.response);
    payload.onError(err);
    yield put({ type: LOADING_STATE, isLoading: false });
    yield put({ type: NEARBY_ERROR, error: err });
  }
}

function* getRestaurant(payload) {
  yield put({ type: LOADING_STATE, isLoading: true });
  try {
    const response = yield call(getRestaurantService, payload.id);
    if (response && response.data._id) {
      payload.onSuccess(response.data);
      yield put({ type: LOADING_STATE, isLoading: false });
      yield put({ type: RESTAURANT_FETCHED, restaurant: response.data });
    } else {
      payload.onError(response.data);
      yield put({ type: LOADING_STATE, isLoading: false });
      yield put({ type: RESTAURANT_ERROR, error: response.data, restaurant: {} });
    }
  } catch (err) {
    payload.onError(err);
    yield put({ type: LOADING_STATE, isLoading: false });
    yield put({ type: RESTAURANT_ERROR, errror: err, restaurant: {} });
  }
}

export function* watcherGetNearby() {
  yield takeLatest(START_GET_NEARBY, getNearby);
}

export function* watcherGetRestaurant() {
  yield takeLatest(START_GET_RESTAURANT, getRestaurant);
}

export function* watcherGetCriteria() {
  yield takeLatest(START_GET_CRITERIA, getFindCriteria);
}

export function* watcherSetCriteria() {
  yield takeLatest(SET_CRITERIA, function* (payload) {
    yield put({ type: CRITERIA_SET, criteria: payload.data });
  });
}