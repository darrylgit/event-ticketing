import {createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {
	userReducer,
	dataReducer,
	formsReducer,
	filterReducer,
	uiReducer,
} from './reducers/index';

const rootReducer = combineReducers({
	user: userReducer,
	data: dataReducer,
	forms: formsReducer,
	filter: filterReducer,
	ui: uiReducer,
});

const configureStore = () => {
	return createStore(rootReducer, {}, applyMiddleware(reduxThunk));
};

export default configureStore;
