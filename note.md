## 網頁中的程式
```javascript
Observable
    .interval(1000).take(3)
    .debug('source1')
    .map(x => x + 1)
    .debug('source2')
    .subscribe();
```

## state 中會存的資料
```javascript
// sourceList
[
    { name: 'source1' },
    { name: 'source2' },
}]

// sourceListItems
{
    source1: [ /* ... */ ],
    source2: [ /* ... */ ],
}
```



## SourceList.js
```javascript
import { Component } from 'react';
import { connect } from 'react-redux';
import MarbleDiagram from './MarbleDiagram.js';

class SourceList extends Component {
    render() {
        return (
            <ul>
                { sourceList.map(this.sourceLi) }
            </ul>
        );
    },

    sourceLi (name) {
        return (
            <li>
                <h2>{ name }</h2>
                <MarbleDiagram source={name} />
            </li>
        );
    }
}

export default connect(state => ({
    sourceList: state.sourceList,
}))(SourceList);
```

## MarbleDiagram.js
```javascript
import  { Component } from 'react';

class SourceListItem extends Component {
    render() {
        return (
            <svg viewBox="0 0 1000 200">
                { /* lalala */ }
            </svg>
        );
    }
}

export default connect((state, props) => {
    sourceListItems: state.sourceListItems[props.name]
})(SourceListItem);
```
