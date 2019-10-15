import {
	ADD_INPUT,
	CLEAR_FORM,
	ADD_TICKET,
	SET_EVENTS,
	CACHE_EVENT,
	CHANGE_EVENT,
	CLEAR_EVENT
} from './actions';

export const addInput = (key, value) => {
	return {
		type:ADD_INPUT,
		key:key,
		value:value
	}
}

export const clearForm = () => {
	return {
		type:CLEAR_FORM,
	}
}

export const addTicket = ticket => {
	return {
		type:ADD_TICKET,
		ticket:ticket
	}
}

export const setEvents = events => {
	return {
		type: SET_EVENTS,
		events:events
	}
}

export const cacheEvent = event => {
	return {
		type: CACHE_EVENT,
		event: event
	}
}

export const changeEvent = (event, key, value) => {
	event[key] = value;
	return {
		type:CHANGE_EVENT,
		event:event
	}
}

export const clearEvent = () => {
	return {
		type:CLEAR_EVENT
	}
}