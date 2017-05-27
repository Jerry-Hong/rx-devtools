import React, { Component } from 'react';

class MarbleDiagram extends Component {
    render() {
        const { name, timestamp } = this.props.source;

        return (
            <svg>
                <text>{name}</text>
                <text>{timestamp}</text>
            </svg>
        );
    }
}

export default MarbleDiagram;
