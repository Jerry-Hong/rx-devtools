import React, { Component } from 'react';
// import { connect } from 'react-redux';
import MarbleDiagram from '../components/MarbleDiagram.js';

class SourceList extends Component {
    render() {
        const list = [
            { name: 'source1', timestamp: 0 },
            { name: 'source2', timestamp: 1000 },
        ];

        return (
            <ul>
                {list.map(this.sourceLi)}
            </ul>
        );
    }

    sourceLi(source) {
        return (
            <li key={`${source.name}-${source.timestamp}`}>
                <h3>{source.name}</h3>
                <MarbleDiagram source={source} />
            </li>
        );
    }
}

// export default connect(state => ({
//     sourceList: state.sourceList,
// }))(SourceList);

export default SourceList;
