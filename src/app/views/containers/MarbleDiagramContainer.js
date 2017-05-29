import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarbleDiagram from '../components/MarbleDiagram.js';

class MarbleDiagramContainer extends Component {
    static defaultProps = {
        source: {},
        sourceItems: [],
    };

    state = {
        axisLength: 0,
    };

    componentDidMount() {
        requestAnimationFrame(timestamp => {
            this.axis(timestamp);
        });
    }

    render() {
        const { axisLength } = this.state;
        const { sourceItems, source: { createAt } } = this.props;
        return (
            <MarbleDiagram
                createAt={createAt}
                axisLength={axisLength}
                sourceItems={sourceItems}
            />
        );
    }

    axis(timestamp) {
        const axisLength = Math.max(0, timestamp - this.props.source.createAt);
        this.setState({ axisLength });

        // XXX : fake end time
        const isFinished = axisLength > 15000;
        if (!isFinished) {
            requestAnimationFrame(timestamp => {
                this.axis(timestamp);
            });
        }
    }
}

export default connect((state, props) => ({
    sourceItems: state.sourceItems[props.source.name],
}))(MarbleDiagramContainer);
