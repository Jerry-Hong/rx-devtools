import { Observable } from 'rxjs';

function accurateTimer(interval) {
    return Observable.create((observer) => {
        var expected = Date.now() + interval;
        var currentNum = 0;
        function step() {
            observer.next(currentNum++)
            const dt = Date.now() - expected; 
            expected += interval;
            setTimeout(step, Math.max(0, interval - dt)); // take into account drift
        }
        const id = setTimeout(step, interval);
        return () => clearTimeout(id)
    })
}

export default accurateTimer