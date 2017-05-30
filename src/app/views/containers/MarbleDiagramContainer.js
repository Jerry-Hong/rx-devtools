import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OBSERVABLE_NEXT } from '../../../constants/index.js';
import MarbleDiagram from '../components/MarbleDiagram.js';

class MarbleDiagramContainer extends Component {
    static defaultProps = {
        source: {},
        sourceItems: [],
    };

    state = {
        startTime: performance.now(),
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
        // draw axis
        const { createAt } = this.props.source;
        const duration = timestamp - this.state.startTime;
        const axisLength = Math.max(0, duration - createAt);
        this.setState({ axisLength });

        // check if we should keep drawing
        const { sourceItems } = this.props;
        const endBubble = sourceItems.filter(
            item => item.type !== OBSERVABLE_NEXT
        )[0];
        const shouldFinish =
            endBubble &&
            endBubble.timestamp &&
            axisLength >= endBubble.timestamp - createAt;
        if (shouldFinish) {
            return;
        }

        requestAnimationFrame(timestamp => {
            this.axis(timestamp);
        });
    }
}

export default connect((state, props) => ({
    sourceItems: state.sourceItems[props.source.name],
}))(MarbleDiagramContainer);
