import React, { Component } from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
import classNames from 'classnames/bind';

import styles from './CurrentTarget.css';

const cx = classNames.bind(styles);

const theme = {
    base00: '#1C1418', // BACKGROUND_COLOR
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e', // ITEM_STRING_EXPANDED_COLOR
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5', // TEXT_COLOR
    base08: '#B9AA8D', // NULL_COLOR, UNDEFINED_COLOR, FUNCTION_COLOR, SYMBOL_COLOR,
    base09: '#BC2479', // NUMBER_COLOR, BOOLEAN_COLOR
    base0A: '#f4bf75',
    base0B: '#A2D836', // STRING_COLOR, DATE_COLOR, ITEM_STRING_COLOR
    base0C: '#a1efe4',
    base0D: '#65C7FF', // LABEL_COLOR, ARROW_COLOR
    base0E: '#ae81ff',
    base0F: '#cc6633',
};

class CurrentTarget extends Component {
    valueRenderer = raw => {
        const type = typeof raw;
        switch (type) {
            case 'number':
                return raw.toFixed(2);
            case 'string':
                return raw.replace(/"/g, "'");
            default:
                return raw;
        }
    };

    shouldExpandNode = (keyName, data, level) => {
        return level < 2 ? true : false;
    };

    render() {
        const { data = {} } = this.props;

        return (
            <div className={cx('code')}>
                <JSONTree
                    data={data}
                    theme={theme}
                    invertTheme={false}
                    valueRenderer={this.valueRenderer}
                    shouldExpandNode={this.shouldExpandNode}
                />
            </div>
        );
    }
}

export default connect(state => ({
    data: state.currentTarget,
}))(CurrentTarget);
