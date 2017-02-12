import { Observable, Scheduler } from 'rxjs';

export default function (sourceName, source) {
    const lineSpan = document.getElementById(sourceName + '-span')
    const timeline = Observable.of('')
                        .merge(
                            Observable.interval(200)
                                .mapTo('-')
                                .observeOn(Scheduler.async)
                                .takeUntil(source.last()),
                            source
                                .observeOn(Scheduler.queue)
                                .map((value) => transform(value))
                                .catch(error => Observable.of('#'))
                        )
                        .scan((origin, next) => origin + next)
                        .finally(() => render(lineSpan, lineSpan.innerHTML + '|'))
                        .share();

    const timelineSub = timeline.subscribe(
            (line) => render(lineSpan, line),
            (error) => console.error(error)
        )
    
    const scroll = Observable.fromEvent(lineSpan, 'scroll')
        .throttleTime(100)
        .pluck('target', 'scrollLeft');
    const scrollSub = timeline
        .takeUntil(
            scroll
            .pairwise()
            .filter(scrollLeft => scrollLeft[0] > scrollLeft[1])
        )
        .subscribe(() => {
            lineSpan.scrollLeft = lineSpan.scrollWidth;
        });
}


function render(element, innerText) {
    element.innerHTML = innerText;
}

function transform(value) {
    if (typeof value === 'object' || Array.isArray(value))
        return `<span class="tooltip">o<pre class="desc"><code class="language-js">${JSON.stringify(value, null, 2)}</code></pre></span>`
    return value
}