import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import {
    RX_DEVTOOL_START,
    RX_DEVTOOL_CUSTOM_EVENT,
    OBSERVABLE_COMPLETE,
    OBSERVABLE_CREATED,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_SUBSCRIBE,
    OBSERVABLE_UNSUBSCRIBE
} from '../constants/index.js';

function createEvent(detail) {
    return new CustomEvent(RX_DEVTOOL_CUSTOM_EVENT, { detail });
}

const sendEvent = data => document.dispatchEvent(createEvent(data));

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
              timestamp: performance.now()
          });
      })
    );
    }
    _next(value) {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_NEXT,
            value: value,
            timestamp: performance.now()
        });
        this.destination.next(value);
    }
    _error(error) {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_ERROR,
            error: error,
            timestamp: performance.now()
        });
        this.destination.error(error);
    }
    _complete() {
        sendEvent({
            source: this.name,
            type: OBSERVABLE_COMPLETE,
            timestamp: performance.now()
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
            timestamp: performance.now()
        });
        return source.subscribe(new DebugSubscriber(subscriber, this.name));
    }
}

window.rxDevtool = function() {
    sendEvent({
        type: RX_DEVTOOL_START,
        timestamp: performance.now()
    });

    function debug(name) {
        sendEvent({
            source: name,
            type: OBSERVABLE_CREATED,
            timestamp: performance.now()
        });
        return this.lift(new DebugOperator(name));
    }
    return debug;
};
