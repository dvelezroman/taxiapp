import { LOGIN_FETCH_SUCCESS, LOGIN_FETCH_ERROR, LOGIN_FETCHING, LOGOUT } from '../actions';

const INITIAL_STATE = {
  fetching: false,
  status: false,
  user: null,
  token: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FETCHING:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case LOGIN_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        status: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default userReducer;
