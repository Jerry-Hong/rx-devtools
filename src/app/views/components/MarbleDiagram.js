import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './MarbleDiagram.css';
const cx = classNames.bind(styles);

class MarbleDiagram extends Component {
    constructor() {
        super();

        this.state = {
            axisLength: 0,
        };
    }

    componentDidMount() {
        requestAnimationFrame(timestamp => {
            this.axis(timestamp);
        });
    }

    render() {
        const length = this.state.axisLength / 10;
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
                            .map((item, index) => this.bubble(item, index))}
                    </g>
                </svg>
            </div>
        );
    }

    bubble(item, index) {
        const { createAt } = this.props.source;
        const shiftX = (item.timestamp - createAt) / 10;

        return (
            <g
                className={cx('circle')}
                key={index}
                transform={`translate(${shiftX}, 0)`}
            >
                <circle cx="0" cy="0" r="20" stroke="#fff" strokeWidth="2" />
                <text x="0" y="0" fill="#fff">{item.value}</text>
            </g>
        );
    }

    axis(timestamp) {
        const axisLength = timestamp - this.props.source.createAt;
        this.setState({ axisLength });

        // XXX : fake end time
        const isFinished = axisLength > 24000;
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
