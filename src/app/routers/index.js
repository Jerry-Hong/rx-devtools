import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from '../views/layout/App.js';
import Marble from '../views/Marble/Marble.js';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="marble" />
        <Route path="marble" component={Marble} />
    </Route>
);
