import { call, put } from 'redux-saga/effects';
import { setloggedUser } from '../creators/user';

function* userWorker(values) {
  try {
    yield put(setloggedUser(values.payload));
  } catch (error) {
    throw new Error(error);
  }
}

export default userWorker;
