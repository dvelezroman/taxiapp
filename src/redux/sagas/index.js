import { takeEvery } from 'redux-saga/effects';
import { LOGIN } from '../actions';
import userWorker from './user';

export default function* watcher() {
	yield takeEvery(LOGIN, userWorker);
}
