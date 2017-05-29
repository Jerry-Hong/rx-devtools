import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Bubble from './Bubble.js';
import styles from './MarbleDiagram.css';

const cx = classNames.bind(styles);

class MarbleDiagram extends Component {
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
        const { source: { createAt } } = this.props;

        const length = axisLength / 10;
        const shiftY = 25;

        return (
            <div className={cx('container')}>
                <svg className={cx('marble-diagram')} width={length}>
                    <g transform={`translate(0, ${shiftY})`}>
                        <line
                            x1="0"
                            x2="100%"
                            y1="0"
                            y2="0"
                            stroke="#333"
                            strokeWidth="2"
                        />
                        <line
                            x1="0"
                            x2={length}
                            y1="0"
                            y2="0"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                        {this.props.sourceItems
                            .filter(({ type }) => type === 'value')
                            .map((item, index) => (
                                <Bubble
                                    key={index}
                                    index={index}
                                    item={item}
                                    createAt={createAt}
                                    axisLength={axisLength}
                                />
                            ))}
                    </g>
                </svg>
            </div>
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
}))(MarbleDiagram);
