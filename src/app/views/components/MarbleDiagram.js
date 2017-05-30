import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import {
    OBSERVABLE_NEXT,
} from '../../../constants/index.js';
import Bubble from './Bubble.js';
import styles from './MarbleDiagram.css';

const cx = classNames.bind(styles);

class MarbleDiagram extends PureComponent {
    static defaultProps = {
        createAt: 0,
        axisLength: 0,
        sourceItems: [],
    };

    render() {
        const { createAt, sourceItems, axisLength } = this.props;

        const length = axisLength / 10;
        const shiftY = 25;

        const middleItem = sourceItems.filter(item => (item.type === OBSERVABLE_NEXT));
        const lastItem = sourceItems.filter(item => (item.type !== OBSERVABLE_NEXT));

        return (
            <div className={cx('container')}>
                <svg className={cx('marble-diagram')} width={length+30}>
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
                        {[
                            ...lastItem,
                            ...middleItem,
                        ].map((item, index) => (
                            <Bubble
                                key={index}
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
}

export default MarbleDiagram;
