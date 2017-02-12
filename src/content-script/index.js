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

const passDataToDevtoolsPanel = (event) => {
    backgroundPageConnection.postMessage({
        name: 'content_script_msg',
        params: event.detail
    });
};

backgroundPageConnection.onMessage.addListener((msg) => {
    window.document.removeEventListener('passDataToDevtoolsPanel', passDataToDevtoolsPanel, false);
});

window.document.addEventListener('passDataToDevtoolsPanel', passDataToDevtoolsPanel, false);

// trigger example:
// document.dispatchEvent(new CustomEvent('passDataToDevtoolsPanel', { detail: { test: '123' } }));


