import { Observable } from 'rxjs';
import debug from '../content-script/debugOperator.js';
import {
    RX_DEVTOOL_START,
    OBSERVABLE_COMPLETE,
    OBSERVABLE_CREATED,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_SUBSCRIBE,
    OBSERVABLE_UNSUBSCRIBE,
    RX_DEVTOOL_CUSTOM_EVENT,
} from '../constants/index.js';
import { addSource, subscribeSource } from './reducers/sources.js';
import {
    receiveComplete,
    receiveError,
    receiveNextValue,
    receiveUnsubscribe,
} from './reducers/sourceItems.js';

Observable.prototype.debug = debug;

export default function(store) {
    const sourceFromBg = Observable.fromEvent(document, RX_DEVTOOL_CUSTOM_EVENT)
        .map(data => data.detail)
        .share();

    sourceFromBg.subscribe(data => {
        const { source, timestamp, value, error } = data;
        switch (data.type) {
            case RX_DEVTOOL_START:
                break;
            case OBSERVABLE_CREATED:
                store.dispatch(addSource(source, timestamp));
                break;
            case OBSERVABLE_SUBSCRIBE:
                store.dispatch(subscribeSource(source, timestamp));
                break;
            case OBSERVABLE_NEXT:
                store.dispatch(receiveNextValue(source, value, timestamp));
                break;
            case OBSERVABLE_ERROR:
                store.dispatch(receiveError(source, error, timestamp));
                break;
            case OBSERVABLE_COMPLETE:
                store.dispatch(receiveComplete(source, timestamp));
                break;
            case OBSERVABLE_UNSUBSCRIBE:
                store.dispatch(receiveUnsubscribe(source, timestamp));
                break;
            default:
                break;
        }
    });

    /**
     * for dev testing 
     */

    Observable.interval(1000) // 0, 1, 2, 3
        .debug('source1')
        .zip(
            Observable.of(
                { name: 'Rulin' },
                { name: 'Anna' },
                { name: 'Jerry' },
                { name: 'Hello' }
            ),
            (x, y) => y
        )
        .debug('source2')
        .subscribe(x => console.log('dev', x));
}
