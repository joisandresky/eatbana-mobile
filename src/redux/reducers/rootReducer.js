import { combineReducers } from "redux";

// List Reducers
import { GuestReducer } from "./guestReducer";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { restaurantReducer } from "./restaurantReducer";

export default combineReducers({
    GuestReducer,
    loginReducer,
    registerReducer,
    restaurantReducer
});