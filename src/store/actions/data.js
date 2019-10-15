import {SET_DATASOURCE} from './actions';

export const setDataSource = (key, value) => {
	return {
		type: SET_DATASOURCE,
		key: key,
		value: value,
	};
};
