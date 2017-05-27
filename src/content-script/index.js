import { 
    CONTENT_SCRIPT_CONNECT, 
    CONTENT_SCRIPT_MESSAGE 
} from '../constants/index.js';

/** 
 * Inject Debuger Operator
*/
import script from 'raw-loader!../../build/tmp/debugOperator.js';

const element = document.createElement('script');
element.appendChild(document.createTextNode(script));
(document.head || document.documentElement).appendChild(element);
element.parentNode.removeChild(element);

/**
 * Connect Background 
*/
const backgroundPageConnection = chrome.runtime.connect({
    name: CONTENT_SCRIPT_CONNECT
});

document.addEventListener('tempData', (event) => {
    backgroundPageConnection.postMessage({
        name: CONTENT_SCRIPT_MESSAGE,
        params: event.detail
    });
}, false);