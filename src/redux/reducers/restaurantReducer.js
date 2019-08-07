export const START_GET_NEARBY = "START_GET_NEARBY";
export const LOADING_STATE = "LOADING_STATE";
export const NEARBY_SUCCESS = "NEARBY_SUCCESS";
export const NEARBY_ERROR = "NEARBY_ERROR";
export const START_GET_RESTAURANT = "START_GET_RESTAURANT";
export const RESTAURANT_FETCHED = "RESTAURANT_FETCHED";
export const RESTAURANT_ERROR = "RESTAURANT_ERROR";

const initialState = {
  restaurants: [],
  total: 0,
  error: null,
  isLoading: false,
  restaurant: {}
};

export const doGetNearby = (data, onSuccess, onError) => {
  return {
    type: START_GET_NEARBY,
    data,
    onSuccess,
    onError
  };
};

export const doGetRestaurant = (id, onSuccess, onError) => {
  return {
    type: START_GET_RESTAURANT,
    id,
    onSuccess,
    onError
  }
}

export const restaurantReducer = (state = initialState, action) => {
  switch (action) {
    case LOADING_STATE:
      return { ...state, isLoading: action.isLoading };
    case NEARBY_SUCCESS:
      return { ...state, restaurants: action.restaurants, error: null };
    case NEARBY_ERROR:
      return { ...state, error: action.error };
    case RESTAURANT_ERROR:
      return { ...state, error: action.error, restaurant: action.restaurant };
    case RESTAURANT_FETCHED:
      return { ...state, restaurant: restaurant, error: null };
    default:
      return state;
  }
}
