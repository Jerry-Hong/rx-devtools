import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import {
    OBSERVABLE_COMPLETE,
    OBSERVABLE_ERROR,
    OBSERVABLE_NEXT,
    OBSERVABLE_UNSUBSCRIBE,
} from '../../../../constants/index.js';
import Text from './Text.js';
import styles from './Bubble.css';

const cx = classNames.bind(styles);

/**
 * get text in bubble
 * @param {string} type OBSERVABLE types: NEXT | ERROR | COMPLETE | UNSUBSCRIBE
 * @param {*} value OBSERVABLE value
 * @return {string} text in bubble
 */
function textContent(type, value) {
    if (type === OBSERVABLE_COMPLETE) {
        return '|';
    }

    if (type === OBSERVABLE_ERROR) {
        return '✕';
    }

    if (type === OBSERVABLE_UNSUBSCRIBE) {
        return '!';
    }

    const valueType = typeof value;

    if (valueType !== 'number' && valueType !== 'string') {
        return Array.isArray(value) ? '[]' : '{ }';
    }

    const postfix = value.toString().length > 2 ? '..' : '';
    const str = value.toString().substring(0, 2);
    return str + postfix;
}

class Bubble extends PureComponent {
    static defaultProps = {
        item: {
            timestamp: 0,
            value: '',
        }, // item never change
        show: false,
        shift: 100000,
        sourceName: '',
        onClick: () => {},
    };

    _onClick = () => {
        const { item, sourceName, onClick } = this.props;
        onClick({
            belong: sourceName,
            ...item,
        });
    };

    render() {
        const { item, show, shift } = this.props;
        const shouldShowCircle = item.type === OBSERVABLE_NEXT;
        const text = textContent(item.type, item.value);

        return (
            <g
                className={cx('bubble', { show })}
                transform={`translate(${shift / 10}, 0)`}
                onClick={this._onClick}
            >
                {shouldShowCircle &&
                    <circle className={cx('circle')} cx="0" cy="0" r="15" />}
                <Text>{text}</Text>
            </g>
        );
    }
}

export default Bubble;
