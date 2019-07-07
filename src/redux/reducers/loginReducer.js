export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const DO_LOGIN = "DO_LOGIN";
export const LOADING_LOGIN = "LOADING_LOGIN";
export const START_LOGOUT = "START_LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_USER_DATA = "GET_USER_DATA";
export const FETCHED_USER_DATA = "FETCHED_USER_DATA";
export const USER_DATA_404 = "USER_DATA_404";

export const initialState = {
    user: null,
    token: null,
    isLoading: false
}

export const doLogin = (user, onSuccess, onError) => {
    return {
        type: DO_LOGIN,
        user,
        onSuccess,
        onError
    }
}

export const doLogout = ({ loggedOut }) => {
    return {
        type: START_LOGOUT,
        loggedOut
    }
}

export const getUserData = () => {
    return {
        type: GET_USER_DATA
    }
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, user: action.data.user, token: action.data.token, error: null };
        case LOGIN_ERROR:
            return { ...state, error: action.error };
        case LOADING_LOGIN:
            return { ...state, isLoading: action.isLoading };
        case LOGOUT_SUCCESS:
            return { ...state, user: null };
        case FETCHED_USER_DATA:
            return { ...state, token: action.token, user: action.user };
        default:
            return state;
    }
}