import { Observable, Subject } from 'rxjs';
import createTimeline from './createTimeline.js';
import startTimeline from './startTimeline.js';

/*
    connect to background
*/
const bgConn = chrome.runtime.connect({ name: 'devtools_panel_conn' });


bgConn.postMessage({
    name: 'devtools_panel_msg',
    tabId: chrome.devtools.inspectedWindow.tabId
});

/*
    panel logic
*/

const draw = document.getElementById('draw');

const sourceFromBg = Observable.fromEventPattern(
    handler => bgConn.onMessage.addListener(handler), 
    handler => bgConn.onMessage.removeListener(handler)
).share();

const allSource = {}; // 保存所有 source 

sourceFromBg
    .filter(x => x.action ==='content_script_msg' && x.params.type === 'create')
    .map(x => x.params)
    .subscribe((value) => {
        allSource[value.source] = new Subject();
        createTimeline(value.source);
    });

sourceFromBg
    .filter(x => x.action ==='content_script_msg' && x.params.type !== 'create')
    .map(x => x.params)
    .subscribe((value) => {
        if(allSource[value.source]) {
            switch(value.type) {
            case 'subscribe':
                startTimeline(value.source, allSource[value.source])
                break;
            case 'next':
                allSource[value.source].next(value.data);
                break;
            case 'error':
                allSource[value.source].error(value.data);
                break;
            case 'complete':
                allSource[value.source].complete();
                break;
            default:
                break;                                
            }
        }
    });

sourceFromBg
    .filter(x => x.action === 'content_script_open')
    .subscribe((value) => {
        // do something on content script conn open
    });

sourceFromBg
    .filter(x => x.action === 'content_script_close')
    .subscribe((value) => {
        // do something on content script conn close
        document.getElementById('draw').innerHTML = '';
    });


