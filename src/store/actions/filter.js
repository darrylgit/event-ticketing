import {
	SET_FILTERED_LIST,
	SET_FILTER,
	CACHE_DATA_FILTER,
	SET_FILTER_KEY_VALUE,
} from './actions';

export const setFilteredList = (key, value) => {
	return {
		type: SET_FILTERED_LIST,
		key: key,
		value: value,
	};
};

export const setFilter = filter => {
	return {
		type: SET_FILTER,
		filter: filter,
	};
};
export const setFilterKeyValue = (k, v) => {
	return {
		type: SET_FILTER_KEY_VALUE,
		key: k,
		value: v,
	};
};
export const cacheDataFilter = filter => {
	return {
		type: CACHE_DATA_FILTER,
		filter: filter,
	};
};
