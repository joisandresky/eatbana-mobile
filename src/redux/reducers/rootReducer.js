import { combineReducers } from "redux";

// List Reducers
import { GuestReducer } from "./guestReducer";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";

export default combineReducers({
    GuestReducer,
    loginReducer,
    registerReducer
});