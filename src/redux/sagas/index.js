import { all } from "redux-saga/effects";
import { watcherLogin, watcherLogout, watcherGetUserAuthentication } from "./loginSaga";
import { watcherDoRegister } from "./registerSaga";
import { watcherGetGuest } from "./guestSaga";
import { watcherGetNearby, watcherGetRestaurant } from "./restaurantSaga";

export default function* rootSaga() {
    yield all([
        watcherLogin(),
        watcherLogout(),
        watcherDoRegister(),
        watcherGetUserAuthentication(),
        watcherGetGuest(),
        watcherGetNearby(),
        watcherGetRestaurant()
    ])
}