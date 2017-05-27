import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';

function createEvent(detail) {
    return new CustomEvent('tempData', { detail });
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
                    type: 'finally',
                    timestamp: performance.now(),
                });
            })
        );
    }
    _next(value) {
        sendEvent({
            source: this.name,
            type: 'next',
            data: value,
            timestamp: performance.now(),
        });
        this.destination.next(value);
    }
    _error(error) {
        sendEvent({
            source: this.name,
            type: 'error',
            error: error,
            timestamp: performance.now(),
        });
        this.destination.error(error);
    }
    _complete() {
        sendEvent({
            source: this.name,
            type: 'complete',
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
            type: 'subscribe',
            timestamp: performance.now()
        });
        return source.subscribe(new DebugSubscriber(subscriber, this.name));
    }
}

window.rxDevtool = function() {
    function debug(name) {
        sendEvent({ 
            source: name, 
            type: 'create',
            timestamp: performance.now()
        });
        return this.lift(new DebugOperator(name));
    }
    return debug;
};
