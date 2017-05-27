import { createDuck } from 'redux-duck';

/**
 * duck
 */
const duck = createDuck('sourceList', 'rx-devtools');

/**
 * action types
 */
const ADD_SOURCE = duck.defineType('ADD_SOURCE');


/**
 * action creators
 */
export const addSource = duck.createAction(ADD_SOURCE);


/**
 * reducer
 */
export default duck.createReducer({
    [ADD_SOURCE]: (state, action) => state.concat(action.payload),

}, []);