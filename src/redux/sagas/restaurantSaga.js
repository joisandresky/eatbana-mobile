import { put, takeLatest, call } from "redux-saga/effects";
import { START_GET_NEARBY, LOADING_STATE, NEARBY_ERROR, NEARBY_SUCCESS, RESTAURANT_ERROR, RESTAURANT_FETCHED, START_GET_RESTAURANT } from "../reducers/restaurantReducer";
import { getNearbyService, getRestaurantService } from "../services/restaurant";


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