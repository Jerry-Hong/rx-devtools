import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './MarbleDiagram.css';
const cx = classNames.bind(styles);

class MarbleDiagram extends Component {
    render() {
        const shiftY = 25;

        return (
            <div className={cx('container')}>
                <svg className={cx('marble-diagram')}>
                    <g transform={`translate(0, ${shiftY})`}>
                        <line
                            x1="0"
                            x2="100%"
                            y1="0"
                            y2="0"
                            stroke="#333"
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
}

export default connect((state, props) => ({
    sourceItems: state.sourceItems[props.source.name],
}))(MarbleDiagram);
