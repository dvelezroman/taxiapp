import { SET_LOGGED_USER } from '../actions';

const INITIAL_STATE = {
  status: false,
  user: null,
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGGED_USER: {
      return { status: true, user: { name: 'User Logged', email: action.payload.email }, token: 'ABCD1234' };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
