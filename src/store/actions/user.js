import {SET_USER_DATA} from './actions';

export const setUserData = (key, value) => {
	return {
		type: SET_USER_DATA,
		key: key,
		value: value,
	};
};
