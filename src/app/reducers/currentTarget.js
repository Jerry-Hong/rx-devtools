import { createDuck } from 'redux-duck';
import { RESET_STORE } from '../../constants/index.js';

const duck = createDuck('currentTarget', 'rx-devtools');

/**
 * action types
 */

const SET_CURRENT_TARGET = duck.defineType('SET_CURRENT_TARGET');

/**
 * action creators
 */

export const setCurrentTarget = duck.createAction(SET_CURRENT_TARGET);

/**
 * reducer
 */

export default duck.createReducer(
    {
        [SET_CURRENT_TARGET]: (state, action) => action.payload,
        [RESET_STORE]: () => ({}),
    },
    {}
);
