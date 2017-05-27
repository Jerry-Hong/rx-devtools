import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarbleDiagram from '../components/MarbleDiagram.js';

class SourceList extends Component {
    render() {
        const { sources } = this.props;
        const list = Object.keys(this.props.sources).map(key => sources[key]);

        // show message if there is no source
        if (!list || !list.length) {
            return <p>No source yet.</p>;
        }

        // show source list
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

export default connect(state => ({
    sources: state.sources,
}))(SourceList);
