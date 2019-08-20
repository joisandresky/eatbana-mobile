export const START_GET_NEARBY = "START_GET_NEARBY";
export const START_GET_CRITERIA = "START_GET_CRITERIA";
export const SET_CRITERIA = "SET_CRITERIA";
export const CRITERIA_SET = "CRITERIA_SET";
export const LOADING_STATE = "LOADING_STATE";
export const NEARBY_SUCCESS = "NEARBY_SUCCESS";
export const NEARBY_ERROR = "NEARBY_ERROR";
export const START_GET_RESTAURANT = "START_GET_RESTAURANT";
export const RESTAURANT_FETCHED = "RESTAURANT_FETCHED";
export const RESTAURANT_ERROR = "RESTAURANT_ERROR";

export const initialState = {
  restaurants: [],
  total: 0,
  error: null,
  isLoading: false,
  restaurant: {},
  criteria: null
};

export const doGetNearby = (data, onSuccess, onError) => {
  return {
    type: START_GET_NEARBY,
    data,
    onSuccess,
    onError
  };
};

export const doGetCriteria = (data, onSuccess, onError) => {
  return {
    type: START_GET_CRITERIA,
    data,
    onSuccess,
    onError
  }
}

export const doGetRestaurant = (id, onSuccess, onError) => {
  return {
    type: START_GET_RESTAURANT,
    id,
    onSuccess,
    onError
  }
}

export const doSetCriteria = (data) => {
  return {
    type: SET_CRITERIA,
    data
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
    case CRITERIA_SET:
      return { ...state, criteria: action.criteria };
    default:
      return state;
  }
}
