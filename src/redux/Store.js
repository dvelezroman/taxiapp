import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watcher from './sagas';
import RootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	RootReducer,
	applyMiddleware(sagaMiddleware),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(watcher);

export default store;
