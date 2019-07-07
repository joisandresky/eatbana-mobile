export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const DO_REGISTER = "DO_REGISTER";

export const initialState = {
    isLoading: false,
    error: null
};

export const doRegister = (newUser, onSuccess, onError) => {
    return {
        type: DO_REGISTER,
        newUser,
        onSuccess,
        onError
    };
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return state;
        case REGISTER_ERROR:
            return { ...state, error: action.error };
        case REGISTER_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
}