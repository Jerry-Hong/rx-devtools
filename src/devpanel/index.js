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
    .filter(x => x.type === 'create')
    .subscribe((value) => {
        allSource[value.source] = new Subject();
        createTimeline(value.source);
    });

sourceFromBg
    .filter(x => x.type !== 'create')
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


