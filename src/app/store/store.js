import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from '../reducers/index.js';

const router = routerMiddleware(hashHistory);

const enhancer = composeWithDevTools(applyMiddleware(router));

export default function(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
