import { LOGIN } from '../actions';

export const login = values => ({
	type: LOGIN,
	payload: values
});
