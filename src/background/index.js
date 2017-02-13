let devtoolsPanelConn = {};
let contentScriptConn = {};

chrome.runtime.onConnect.addListener((connPort) => {

    let devtoolsPanelListener = (message, port, sendResponse) => {
        devtoolsPanelConn[message.tabId] = connPort;
        if (message.tabId in contentScriptConn) {
            contentScriptConn[message.tabId].postMessage({ action: 'devtools_panel_open'});
        }
    };

    let contentScriptListener = (message, port, sendResponse) => {
        if (port.sender.tab.id in devtoolsPanelConn) {
            devtoolsPanelConn[port.sender.tab.id].postMessage({
                action: 'content_script_msg',
                params: message.params
            });
        }
    };

    switch (connPort.name) {
        case 'devtools_panel_conn':
            connPort.onMessage.addListener(devtoolsPanelListener);
            connPort.onDisconnect.addListener((port) => {
                port.onMessage.removeListener(devtoolsPanelListener);

                for (let tabId in devtoolsPanelConn) {
                    if (devtoolsPanelConn[tabId] == port) {
                        delete devtoolsPanelConn[tabId];
                        if (tabId in contentScriptConn) {
                            contentScriptConn[tabId].postMessage({ action: 'devtools_panel_close'});
                        }
                        break;
                    }
                }
            });
            break;

        case 'content_script_conn':
            contentScriptConn[connPort.sender.tab.id] = connPort;
            if (connPort.sender.tab.id in devtoolsPanelConn) {
                devtoolsPanelConn[connPort.sender.tab.id].postMessage({ action: 'content_script_open'});
            }

            connPort.onMessage.addListener(contentScriptListener);
            connPort.onDisconnect.addListener((port) => {
                port.onMessage.removeListener(contentScriptListener);

                for (let tabId in contentScriptConn) {
                    if (contentScriptConn[tabId] == port) {
                        delete contentScriptConn[tabId];
                        if (tabId in devtoolsPanelConn) {
                            devtoolsPanelConn[tabId].postMessage({ action: 'content_script_close'});
                        }
                        break;
                    }
                }
            });
            break;
    }
});