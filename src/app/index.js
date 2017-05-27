import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import rootReducer from './reducers/index.js';
import routes from './routers/index.js';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
