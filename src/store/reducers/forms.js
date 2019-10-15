import {
	ADD_INPUT,
	CLEAR_FORM,
	ADD_TICKET,
	SET_EVENTS,
	CACHE_EVENT,
	CHANGE_EVENT,
	CLEAR_EVENT,
} from '../actions/actions';

const initialState = {
	tickets_added: [],
	ticket_inputs: [],
};

export const formsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INPUT:
			return Object.assign({}, state, {[action.key]: action.value});
		case CLEAR_FORM:
			return {
				...state,
				ticket_inputs: [],
			};
		case ADD_TICKET:
			state.tickets_added.unshift(action.ticket);
			return {
				...state,
				tickets_added: state.tickets_added,
			};
		case SET_EVENTS:
			return {
				...state,
				events: action.events,
			};
		case CACHE_EVENT:
			return {
				...state,
				eventCached: action.event,
			};
		case CHANGE_EVENT:
			return {
				...state,
				events: state.events
					.filter(event => {
						return event.key !== action.event.key;
					})
					.concat(action.event),
			};
		case CLEAR_EVENT:
			return {
				...state,
				tickets_added: [],
				eventDescription: '',
			};
		default:
			return state;
	}
};
