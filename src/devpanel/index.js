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
    CONTENT_SCRIPT_MESSAGE
} from '../constants/index.js';

const store = createStore(rootReducer);

function realRender() {
    ReactDOM.render(<Provider store={store}>
        <App></App>
    </Provider>, document.getElementById('root'));
}

// import { Observable, Subject } from 'rxjs';
// import createTimeline from './createTimeline.js';
// import startTimeline from './startTimeline.js';

/**
 * panel logic
 */

// const draw = document.getElementById('draw');



// let allSource = {}; // 保存所有 source 

// sourceFromBg
//     .filter(x => x.action ==='content_script_msg')
//     .map(x => x.params)
//     .subscribe((value) => {
//         switch(value.type) {
//         case 'create': 
//             if(allSource[value.source]) {
//                 break;
//             }
//             allSource[value.source] = new Subject();
//             createTimeline(value.source);
//             break;
//         case 'subscribe':
//             startTimeline(value.source, allSource[value.source])
//             break;
//         case 'next':
//             allSource[value.source].next(value.data);
//             break;
//         case 'error':
//             allSource[value.source].error(value.data);
//             break;
//         case 'complete':
//             allSource[value.source].complete();
//             break;
//         case 'finally':
//             allSource[value.source].next('!')
//         default:
//             break;                                
//         }
//     });



// sourceFromBg
//     .filter(x => x.action === 'content_script_close')
//     .subscribe((value) => {
//         // do something on content script conn close
//         allSource = {};
//         document.getElementById('draw').innerHTML = '';
//     });

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
    ).share();

    sourceFromBg
    .filter(message => message.name === CONTENT_SCRIPT_MESSAGE)
    .subscribe((message) => {
        console.log(message);
        realRender();
    });

}

init(chrome.devtools.inspectedWindow.tabId);