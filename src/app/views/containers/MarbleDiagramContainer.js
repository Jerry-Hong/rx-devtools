import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OBSERVABLE_NEXT } from '../../../constants/index.js';
import { setCurrentTarget } from '../../reducers/currentTarget.js';
import animationObservable from '../../util/animationObservable.js';
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
        const { source: { createAt } } = this.props;

        this.animation = animationObservable(this.state.startTime)
            .map(duration => Math.max(0, duration - createAt))
            .do(axisLength => this.setState({ axisLength }))
            .takeWhile(axisLength => {
                const { sourceItems } = this.props;
                const endBubble = sourceItems.find(
                    item => item.type !== OBSERVABLE_NEXT
                ) || {};
                return !(endBubble.timestamp &&
                    axisLength >= endBubble.timestamp - createAt);
            })
            .subscribe(() => {});
    }

    componentWillUnmount() {
        this.animation.unsubscribe();
    }

    render() {
        const { axisLength } = this.state;
        const { sourceItems, source: { createAt, name } } = this.props;

        return (
            <MarbleDiagram
                createAt={createAt}
                axisLength={axisLength}
                sourceName={name}
                sourceItems={sourceItems}
                clickBubble={this.clickBubble}
            />
        );
    }

    clickBubble = data => {
        const { setCurrentTarget } = this.props;
        setCurrentTarget(data);
    };
}

export default connect(
    (state, props) => ({
        sourceItems: state.sourceItems[props.source.name],
    }),
    { setCurrentTarget }
)(MarbleDiagramContainer);
