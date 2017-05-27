import { Observable, Scheduler } from 'rxjs';
import accurateTimer from './accurateTimer.js';

export default function (sourceName, source) {
    const lineSpan = document.getElementById(sourceName + '-span')
    const timeline = Observable.of('')
                        .merge(
                            accurateTimer(200)
                                .mapTo('-')
                                .takeUntil(source.last()),
                            source
                                .map((value) => transform(value))
                                .catch(error => Observable.of('#'))
                        )
                        .share();

    const timelineSub = timeline.subscribe(
            (line) => {
                render(lineSpan, line)
                if (line === '!') {
                    timelineSub.unsubscribe();
                }
            },
            (error) => console.error(error),
            () => render(lineSpan, '|')
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
        }, (error) => {
            console.error(error);
        }, () => {
            lineSpan.scrollLeft = lineSpan.scrollWidth;            
        });
}


function render(element, innerText) {
    element.innerHTML = element.innerHTML + innerText;
}

function transform(value) {
    if (typeof value === 'object' || Array.isArray(value))
        return `<span class="tooltip">o<pre class="desc"><code class="language-js">${JSON.stringify(value, null, 2)}</code></pre></span>`
    return value
}