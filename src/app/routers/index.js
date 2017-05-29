import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from '../views/layout/App.js';
import SourceList from '../views/layout/SourceList.js';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="list" />
        <Route path="list" component={SourceList} />
    </Route>
);
