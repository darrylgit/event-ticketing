import {
	SET_FILTER,
	SET_FILTER_KEY_VALUE,
	SET_FILTERED_LIST,
	CACHE_DATA_FILTER,
} from '../actions/actions';

const initialState = {
	filter: {},
	events: [],
	currentDataFilteredBy: {},
	locationSearchResults: [],
	groupsByLocationFetchedData: [],
	groupsByLocationSearchResults: [],
	locationSelectedByUser: {},
	eventCategorySelectedByUser: '',
};

export const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FILTER:
			return {
				...state,
				filter: action.filter,
			};
		case SET_FILTER_KEY_VALUE:
			return Object.assign({}, state, {[action.key]: action.value});
		case SET_FILTERED_LIST:
			return Object.assign({}, state, {[action.key]: action.value});
		case CACHE_DATA_FILTER:
			return {
				...state,
				currentDataFilteredBy: action.filter,
			};
		default:
			return state;
	}
};
