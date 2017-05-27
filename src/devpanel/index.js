import React from 'react';
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import rootReducer from '../app/reducers/index.js';
import App from '../app/views/layout/App.js';
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
    OBSERVABLE_UNSUBSCRIBE
} from '../constants/index.js';
import { 
    addSource, 
    subscribeSource
} from '../app/reducers/sourceList.js';
import { receiveComplete, receiveError, receiveNextValue, receiveUnsubscribe } from '../app/reducers/sourceItems.js';

const store = createStore(rootReducer);

function realRender() {
    ReactDOM.render(<Provider store={store}>
        <App></App>
    </Provider>, document.getElementById('root'));
}

function renderForNothing() {
    ReactDOM.render(<p>
        there is no connecting.
    </p>, document.getElementById('root'));
}

function init(id) {
    
    renderForNothing();

    /**
     * connect and init
     */
    const bgConnection = chrome.runtime.connect({ 
        name: DEVTOOLS_PANEL_CONNECT 
    });
    bgConnection.postMessage({ name: DEVTOOLS_PANEL_INIT, tabId: id });

    const sourceFromBg = Observable.fromEventPattern(
        handler => bgConnection.onMessage.addListener(handler), 
        handler => bgConnection.onMessage.removeListener(handler)
    )
    .filter(message => message.name === CONTENT_SCRIPT_MESSAGE)    
    .map(message => message.params)
    .share();

    sourceFromBg
    .filter(data => data.type === RX_DEVTOOL_START)
    .subscribe((data) => {
        const { name, timestamp, value, error } = data;
        switch (data.type) {
        case RX_DEVTOOL_START:
            realRender();
            break;
        case OBSERVABLE_CREATED:
            store.dispatch(addSource(name, timestamp));
            break;
        case OBSERVABLE_SUBSCRIBE:
            store.dispatch(subscribeSource(name, timestamp));
            break;
        case OBSERVABLE_NEXT:
            store.dispatch(receiveNextValue(name, value, timestamp));
            break;
        case OBSERVABLE_ERROR:
            store.dispatch(receiveError(name, error, timestamp));
            break;
        case OBSERVABLE_COMPLETE:
            store.dispatch(receiveComplete(name, timestamp));
            break;
        case OBSERVABLE_UNSUBSCRIBE:
            store.dispatch(receiveUnsubscribe(name, timestamp));
            break;
        default:
            break;
        }
    });

}

init(chrome.devtools.inspectedWindow.tabId);