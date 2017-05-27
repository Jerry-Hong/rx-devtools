import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import rootReducer from './reducers/index.js';
import App from './views/layout/App.js';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}>
    <App></App>
</Provider>, document.getElementById('root'));
