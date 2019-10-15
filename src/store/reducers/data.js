import {SET_DATASOURCE} from '../actions/actions';

const initialState = {};

export const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATASOURCE:
			return Object.assign({}, state, {[action.key]: action.value});
		default:
			return state;
	}
};
