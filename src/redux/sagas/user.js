import { call } from 'redux-saga/effects';

export default function* userWorker(values) {
	try {
		// yield call(callback, values.payload)
		console.log('userWorker');
	} catch (error) {
		throw new Error(error);
	}
}
