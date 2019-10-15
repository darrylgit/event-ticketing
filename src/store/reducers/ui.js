import {
	SET_UI_LOADING,
	SET_UI_TRANSITIONING,
	SET_UI_ICON,
	CLEAR_UI,
} from '../actions/actions';

const initialState = {
	isLoading: true,
	isTransitioning: false,
	icons: [],
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_UI_LOADING:
			return {
				...state,
				isLoading: action.ui.isLoading,
			};
		case SET_UI_TRANSITIONING:
			return {
				...state,
				isTransitioning: action.ui.isTransitioning,
			};
		case SET_UI_ICON:
			return {
				...state,
				icons: state.icons
					.filter(icon => {
						return icon.id !== action.ui.id;
					})
					.concat(action.ui),
			};
		case CLEAR_UI:
			return Object.assign({}, state, {[action.key]: action.value});
		default:
			return state;
	}
};
