import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import './scss/main.css';
import Router from './components/Router';
import reducers from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promiseMiddleware)));

ReactDOM.render(
	<Provider store={store}>
		<Router />
	</Provider>
, document.getElementById('root'));
