import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import createStore from './store/store.js';
import routes from './routers/index.js';

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

/**
 * just for dev
 */

if (process.env.ENV_VARIABLE !== 'production') {
    require('./dev.js').default(store);
}
