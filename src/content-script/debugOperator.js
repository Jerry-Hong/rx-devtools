import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import {
    OBSERVABLE_COMPLETE,
    OBSERVABLE_CREATED,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_SUBSCRIBE,
    OBSERVABLE_UNSUBSCRIBE,
} from '../constants/index.js';
import sendEvent from './sendEvent.js';

class DebugSubscriber extends Subscriber {
    constructor(destination, name) {
        super(destination);
        this.name = name;
        this.destination = destination;
        this.add(
            new Subscription(() => {
                sendEvent({
                    source: name,
                    type: OBSERVABLE_UNSUBSCRIBE,
                    timestamp: performance.now(),
                });
            })
        );
    }
    _next(value) {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_NEXT,
            value: value,
            timestamp: performance.now(),
        });
        this.destination.next(value);
    }
    _error(error) {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_ERROR,
            error: error,
            timestamp: performance.now(),
        });
        this.destination.error(error);
    }
    _complete() {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_COMPLETE,
            timestamp: performance.now(),
        });
        this.destination.complete();
    }
}

class DebugOperator {
    constructor(name) {
        this.name = name;
    }

    call(subscriber, source) {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_SUBSCRIBE,
            timestamp: performance.now(),
        });
        return source.subscribe(new DebugSubscriber(subscriber, this.name));
    }
}

export default function debug(name) {
    sendEvent({
        source: name,
        type: OBSERVABLE_CREATED,
        timestamp: performance.now(),
    });
    return this.lift(new DebugOperator(name));
}
