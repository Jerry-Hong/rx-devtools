import { combineReducers } from 'redux';
import sources from './sources.js';
import sourceItems from './sourceItems.js';

export default combineReducers({
    sources,
    sourceItems
});
