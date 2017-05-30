import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import {
    OBSERVABLE_COMPLETE,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_UNSUBSCRIBE,
} from '../../../constants/index.js';
import styles from './Bubble.css';

const cx = classNames.bind(styles);

/**
 * get text in bubble
 * @param {string} type OBSERVABLE types: NEXT | ERROR | COMPLETE | UNSUBSCRIBE
 * @param {*} value OBSERVABLE value
 * @return {string} text in bubble
 */
function textContent (type, value) {
    if (type === OBSERVABLE_COMPLETE) {
        return '';
    }

    if (type === OBSERVABLE_ERROR) {
        return '✕';
    }

    if (type === OBSERVABLE_UNSUBSCRIBE) {
        return '!';
    }

    const valueType = typeof value;

    if (valueType !== 'number' && valueType !== 'string') {
        return '';
    }

    return `${value}`.length > 1 ? `...${value[0]}` : value;
}

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

        const shouldShowEnd = item.type === OBSERVABLE_COMPLETE;
        const shouldShowCircle = item.type === OBSERVABLE_NEXT;

        const text = textContent(item.type, item.value);

        if (axisLength < shift) {
            return <g />;
        }

        return (
            <g
                className={cx('bubble')}
                transform={`translate(${shift / 10}, 0)`}
            >
                {shouldShowEnd
                    ? <line
                          className={cx('end')}
                          x1="0"
                          x2="0"
                          y1="-20"
                          y2="20"
                      />
                    : null}
                {shouldShowCircle
                    ? <circle className={cx('circle')} cx="0" cy="0" r="15" />
                    : null}
                {text
                    ? <text className={cx('text')} x="0" y="0">{text}</text>
                    : null}
            </g>
        );
    }
}

export default Bubble;
