/*
Inject Debuger Operator
*/
const element = document.createElement('script');
element.src = chrome.runtime.getURL('debugOperator.js');
(document.head || document.documentElement).appendChild(element);

/*
Connect Background 
*/
const backgroundPageConnection = chrome.runtime.connect({
    name: "content_script_conn"
});

let debugLogs = [];
let panelDataQueue = [];

const tempData = (event) => {
    debugLogs.push(event.detail);
    panelDataQueue.push(event.detail);
    passTempDataToDevtoolPanel();
};

const passTempDataToDevtoolPanel = () => {
    while (panelDataQueue.length > 0) {
        let data = panelDataQueue.shift();
        backgroundPageConnection.postMessage({
            name: 'content_script_msg',
            params: data
        });
    }
};

backgroundPageConnection.onMessage.addListener((msg) => {
    switch (msg.action) {
        case 'devtools_panel_open':
            panelDataQueue = [...debugLogs];
            passTempDataToDevtoolPanel()
            break;
    
        case 'devtools_panel_close':
            window.document.removeEventListener('tempData', tempData, false);
            break;
    }
});

window.document.addEventListener('tempData', tempData, false);

// trigger example:
// document.dispatchEvent(new CustomEvent('tempData', { detail: { test: '123' } }));


