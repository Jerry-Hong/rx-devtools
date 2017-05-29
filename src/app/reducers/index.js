import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sources from './sources.js';
import sourceItems from './sourceItems.js';

export default combineReducers({
    routing: routerReducer,
    sources,
    sourceItems,
});
