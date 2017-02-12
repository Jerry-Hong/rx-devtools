# Rx Devtools

## Usage

```javascript
import { Observable } from 'rxjs';

Observable.prototype.debug = window.RxDevTool(Observable);

Observable.interval(1000).take(5)
    .debug('source1')
    .map(x => x + 1)
    .debug('source2')
    .subscribe(function() {})
```