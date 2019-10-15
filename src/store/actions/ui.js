import {
	SET_UI_ICON,
	SET_UI_LOADING,
	SET_UI_TRANSITIONING,
	CLEAR_UI,
} from './actions';

export const setUILoading = ui => {
	return {
		type: SET_UI_LOADING,
		ui: ui,
	};
};

export const setUITransitioning = ui => {
	return {
		type: SET_UI_TRANSITIONING,
		ui: ui,
	};
};

export const setUIIcon = ui => {
	return {
		type: SET_UI_ICON,
		ui: ui,
	};
};

export const clearUI = (k, v) => {
	return {
		type: CLEAR_UI,
		key: k,
		value: v,
	};
};
