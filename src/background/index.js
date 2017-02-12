let devtoolsPanelConn = {};
let contentScriptConn = {};

chrome.runtime.onConnect.addListener((connPort) => {

    let devtoolsPanelListener = (message, port, sendResponse) => {
        if (message.tabId in contentScriptConn) {
            devtoolsPanelConn[message.tabId] = connPort;
        }
    };

    let contentScriptListener = (message, port, sendResponse) => {
        if (port.sender.tab.id in devtoolsPanelConn) {
            devtoolsPanelConn[port.sender.tab.id].postMessage(message.params);
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
                            contentScriptConn[tabId].postMessage();
                        }
                        break;
                    }
                }
            });
            break;

        case 'content_script_conn':
            contentScriptConn[connPort.sender.tab.id] = connPort;
            connPort.onMessage.addListener(contentScriptListener);
            connPort.onDisconnect.addListener((port) => {
                port.onMessage.removeListener(contentScriptListener);

                for (let tabId in contentScriptConn) {
                    if (contentScriptConn[tabId] == port) {
                        delete contentScriptConn[tabId];
                        if (tabId in devtoolsPanelConn) {
                            delete devtoolsPanelConn[tabId];
                        }
                        break;
                    }
                }
            });
            break;
    }
});