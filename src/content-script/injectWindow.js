import debug from './debugOperator.js';
import { RX_DEVTOOL_START } from '../constants/index.js';
import sendEvent from './sendEvent.js';

window.rxDevtool = function() {
    sendEvent({
        type: RX_DEVTOOL_START,
        timestamp: performance.now(),
    });
    return debug;
};
