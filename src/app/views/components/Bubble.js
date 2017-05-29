import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import styles from './Bubble.css';

const cx = classNames.bind(styles);

class Bubble extends PureComponent {
    static defaultProps = {
        item: {
            timestamp: 0,
            value: '',
        }, // item never change
        axisLength: 0,
        createAt: 0,
    };

    render() {
        const { item, axisLength, createAt } = this.props;
        const shift = item.timestamp - createAt;

        if (axisLength < shift) {
            return <g />;
        }

        return (
            <g
                className={cx('circle')}
                transform={`translate(${shift / 10}, 0)`}
            >
                <circle cx="0" cy="0" r="20" stroke="#fff" strokeWidth="2" />
                <text x="0" y="0" fill="#fff">{item.value}</text>
            </g>
        );
    }
}

export default Bubble;
