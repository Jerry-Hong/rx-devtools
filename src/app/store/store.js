import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from '../reducers/index.js';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(router);

export default function (initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
