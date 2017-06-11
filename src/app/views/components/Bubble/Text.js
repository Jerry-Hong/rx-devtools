import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import styles from './Bubble.css';

const cx = classNames.bind(styles);

class Text extends PureComponent {
    static defaultProps = {
        children: '',
    };
    render() {
        const { children } = this.props;
        let x = 0;
        let big = false;

        if (children === '!' || children === '✕' || children === '|') {
            x = 20;
            big = true;
        }

        return (
            <text className={cx('text', { big })} x={x} y="0">
                {children}
            </text>
        );
    }
}

export default Text;
