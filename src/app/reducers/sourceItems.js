import { createDuck } from 'redux-duck';
import {
    OBSERVABLE_COMPLETE,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_UNSUBSCRIBE,
} from '../../constants/index.js';

/**
 * duck
 */
const duck = createDuck('sourceItems', 'rx-devtools');

/**
 * action types
 */
const RECEIVE_NEXT = duck.defineType('RECEIVE_NEXT');
const RECEIVE_ERROR = duck.defineType('RECEIVE_ERROR');
const RECEIVE_COMPLETE = duck.defineType('RECEIVE_COMPLETE');
const RECEIVE_UNSUBSCRIBE = duck.defineType('RECEIVE_UNSUBSCRIBE');

/**
 * action creators
 */
export const receiveNextValue = (sourceName, value, timestamp) =>
    duck.createAction(RECEIVE_NEXT)({ sourceName, value, timestamp });
export const receiveError = (sourceName, error, timestamp) =>
    duck.createAction(RECEIVE_ERROR)({ sourceName, error, timestamp });
export const receiveComplete = (sourceName, timestamp) =>
    duck.createAction(RECEIVE_COMPLETE)({ sourceName, timestamp });
export const receiveUnsubscribe = (sourceName, timestamp) =>
    duck.createAction(RECEIVE_UNSUBSCRIBE)({ sourceName, timestamp });

/**
 * reducer
 */
const initialState = {};

export default duck.createReducer(
    {
        [RECEIVE_NEXT]: (state, action) => {
            const { sourceName, value, timestamp } = action.payload;
            const items = state[sourceName] || [];
            state[sourceName] = [
                ...items,
                { type: OBSERVABLE_NEXT, value, timestamp },
            ];
            return { ...state };
        },
        [RECEIVE_ERROR]: (state, action) => {
            const { sourceName, error, timestamp } = action.payload;
            const items = state[sourceName] || [];
            state[sourceName] = [
                ...items,
                { type: OBSERVABLE_ERROR, error, timestamp },
            ];
            return { ...state };
        },
        [RECEIVE_COMPLETE]: (state, action) => {
            const { sourceName, timestamp } = action.payload;
            const items = state[sourceName] || [];
            state[sourceName] = [
                ...items,
                { type: OBSERVABLE_COMPLETE, timestamp },
            ];
            return { ...state };
        },
        [RECEIVE_UNSUBSCRIBE]: (state, action) => {
            const { sourceName, timestamp } = action.payload;
            const items = state[sourceName] || [];
            state[sourceName] = [
                ...items,
                { type: OBSERVABLE_UNSUBSCRIBE, timestamp },
            ];
            return { ...state };
        },
    },
    initialState
);
