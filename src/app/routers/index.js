import React from 'react';
import { Route } from 'react-router';
import App from '../views/layout/App.js';
import SourceList from '../views/layout/SourceList.js';

export default (
    <Route path="/" component={App}>
        <Route path="list" component={SourceList} />
    </Route>
);
