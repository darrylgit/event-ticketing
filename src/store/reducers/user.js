import {SET_USER_DATA} from '../actions/actions';

const initialState = {
	orders: [],
	confirmationResults: {},
	user: {},
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return Object.assign({}, state, {[action.key]: action.value});
		default:
			return state;
	}
};
