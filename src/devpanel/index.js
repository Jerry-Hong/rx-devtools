import React from 'react';
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import createStore from '../app/store/store.js';
import routes from '../app/routers/index.js';
import {
    DEVTOOLS_PANEL_CONNECT,
    DEVTOOLS_PANEL_INIT,
    CONTENT_SCRIPT_MESSAGE,
    RX_DEVTOOL_START,
    OBSERVABLE_COMPLETE,
    OBSERVABLE_CREATED,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_SUBSCRIBE,
    OBSERVABLE_UNSUBSCRIBE,
} from '../constants/index.js';
import { addSource, subscribeSource } from '../app/reducers/sources.js';
import {
    receiveComplete,
    receiveError,
    receiveNextValue,
    receiveUnsubscribe,
} from '../app/reducers/sourceItems.js';

const store = createStore();

function realRender() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory} routes={routes} />
        </Provider>,
        document.getElementById('root')
    );
}

function renderForNothing() {
    ReactDOM.render(
        <p>
            there is no connecting.
        </p>,
        document.getElementById('root')
    );
}

function init(id) {
    renderForNothing();

    /**
     * connect and init
     */
    const bgConnection = chrome.runtime.connect({
        name: DEVTOOLS_PANEL_CONNECT,
    });
    bgConnection.postMessage({ name: DEVTOOLS_PANEL_INIT, tabId: id });

    const sourceFromBg = Observable.fromEventPattern(
        handler => bgConnection.onMessage.addListener(handler),
        handler => bgConnection.onMessage.removeListener(handler)
    )
        .filter(message => message.name === CONTENT_SCRIPT_MESSAGE)
        .map(message => message.params)
        .share();

    sourceFromBg.subscribe(data => {
        const { source, timestamp, value, error } = data;
        switch (data.type) {
            case RX_DEVTOOL_START:
                realRender();
                break;
            case OBSERVABLE_CREATED:
                store.dispatch(addSource(source, timestamp));
                console.log(store.getState());
                break;
            case OBSERVABLE_SUBSCRIBE:
                store.dispatch(subscribeSource(source, timestamp));
                break;
            case OBSERVABLE_NEXT:
                store.dispatch(receiveNextValue(source, value, timestamp));
                break;
            case OBSERVABLE_ERROR:
                store.dispatch(receiveError(source, error, timestamp));
                break;
            case OBSERVABLE_COMPLETE:
                store.dispatch(receiveComplete(source, timestamp));
                break;
            case OBSERVABLE_UNSUBSCRIBE:
                store.dispatch(receiveUnsubscribe(source, timestamp));
                break;
            default:
                break;
        }
    });
}

init(chrome.devtools.inspectedWindow.tabId);
