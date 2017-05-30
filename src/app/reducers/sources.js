import { createDuck } from 'redux-duck';

/**
 * duck
 */
const duck = createDuck('sourceList', 'rx-devtools');

/**
 * action types
 */
const ADD_SOURCE = duck.defineType('ADD_SOURCE');
const SUBSCRIBE_SOURCE = duck.defineType('SUBSCRIBE_SOURCE');

/**
 * action creators
 */

export const addSource = (name, createAt) =>
    duck.createAction(ADD_SOURCE)({ name, createAt });
export const subscribeSource = (name, subscribeAt) =>
    duck.createAction(SUBSCRIBE_SOURCE)({ name, subscribeAt });

/**
 * reducer
 */
const initialState = {};

export default duck.createReducer(
    {
        [ADD_SOURCE]: (state, action) => {
            state[action.payload.name] = action.payload;
            return { ...state };
        },
        [SUBSCRIBE_SOURCE]: (state, action) => {
            state[action.payload.name] = {
                ...state[action.payload.name],
                subscribeAt: action.payload.subscribeAt,
            };
            return { ...state };
        },
    },
    initialState
);
