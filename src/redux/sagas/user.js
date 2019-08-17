import { call, put } from 'redux-saga/effects';
import { loginFetching, loginFetchSuccess, loginFetchError } from '../creators/user';

const login = ({ email, password }) => {
  try {
    const token = 'ABC123';
    return {
      user: {
        email,
        password,
      },
      token,
    };
  } catch (error) {
    throw new Error({ msg: 'The credentials are wrong!', status: true });
  }
};

function* userWorker(values) {
  try {
    yield put(loginFetching());
    const response = yield call(login, values.payload);
    yield put(loginFetchSuccess(response));
  } catch (error) {
    yield put(loginFetchError(error));
  }
}

export default userWorker;
