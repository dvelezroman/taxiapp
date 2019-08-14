import { LOGIN } from '../actions';

const INITIAL_STATE = {
	status: false,
	user: null,
	token: null
};

export default (userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN: {
			return state;
		}
		default: {
			return state;
		}
	}
});
