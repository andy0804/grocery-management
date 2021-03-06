import {
  AUTH_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
  LOGIN_REQUEST,
} from "../types/groceryItems";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
        grocery: [],
      };

    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default auth;
