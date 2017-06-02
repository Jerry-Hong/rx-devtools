import { RX_DEVTOOL_CUSTOM_EVENT } from '../constants/index.js';

function createEvent(detail) {
    return new CustomEvent(RX_DEVTOOL_CUSTOM_EVENT, { detail });
}

export default data => document.dispatchEvent(createEvent(data));
