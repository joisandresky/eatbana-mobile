export const GET_GUEST = "GET_GUEST";
export const FETCHED_GUEST = "FETCHED_GUEST";
export const ERR_FETCHED_GUEST = "ERR_FETCHED_GUEST";
export const LOADING_GET_GUEST = "LOADING_GET_GUEST";

export const initialState = {
    isLoading: false,
    error: null,
    guest: null
}

export const doGetGuest = (id, onError) => {
    console.log(id);
    return {
        type: GET_GUEST,
        id,
        onError
    };
};

export function GuestReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHED_GUEST:
            return { ...state, guest: action.guest }
        case ERR_FETCHED_GUEST:
            return { ...state, error: action.err, guest: null }
        case LOADING_GET_GUEST:
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
}