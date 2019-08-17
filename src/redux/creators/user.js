import { LOGIN, LOGIN_FETCHING, LOGIN_FETCH_SUCCESS, LOGIN_FETCH_ERROR, LOGOUT } from '../actions';

export const login = values => ({
  type: LOGIN,
  payload: values,
});

export const loginFetching = () => ({
  type: LOGIN_FETCHING,
});

export const loginFetchSuccess = values => ({
  type: LOGIN_FETCH_SUCCESS,
  payload: values,
});

export const loginFetchError = values => ({
  type: LOGIN_FETCH_ERROR,
  payload: values,
});

export const logout = () => ({
  type: LOGOUT,
})