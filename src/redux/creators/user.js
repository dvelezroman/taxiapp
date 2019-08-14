import { LOGIN, SET_LOGGED_USER } from '../actions';

export const login = values => ({
  type: LOGIN,
  payload: values,
});

export const setloggedUser = values => ({
  type: SET_LOGGED_USER,
  payload: values,
});
