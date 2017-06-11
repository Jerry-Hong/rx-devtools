import { Observable, Scheduler } from 'rxjs';

export default function(start) {
    return Observable.interval(0, Scheduler.animationFrame).map(
        () => performance.now() - start
    );
}
