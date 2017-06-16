import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';

import Bubble from './Bubble/Bubble.js';
import styles from './MarbleDiagram.css';

const cx = classNames.bind(styles);

class MarbleDiagram extends PureComponent {
    static defaultProps = {
        createAt: 0,
        axisLength: 0,
        sourceName: '',
        sourceItems: [],
        clickBubble: () => {},
    };

    render() {
        const {
            createAt,
            sourceName,
            sourceItems,
            axisLength,
            clickBubble,
        } = this.props;

        const length = axisLength / 10;
        const shiftY = 25;

        return (
            <div className={cx('container')}>
                <svg className={cx('marble-diagram')} width={length + 30}>
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
                        {sourceItems.map(item => {
                            const shift = item.timestamp - createAt;

                            return (
                                <Bubble
                                    key={sourceName + item.timestamp}
                                    show={shift < axisLength}
                                    shift={shift}
                                    item={item}
                                    sourceName={sourceName}
                                    onClick={clickBubble}
                                />
                            );
                        })}
                    </g>
                </svg>
            </div>
        );
    }
}

export default MarbleDiagram;
