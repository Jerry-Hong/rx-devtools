import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import MarbleDiagram from '../../containers/MarbleDiagramContainer.js';
import styles from './SourceList.css';

const cx = classNames.bind(styles);

class SourceListItem extends Component {
    render() {
        const { source } = this.props;

        return (
            <li className={cx('item')}>
                <h3 className={cx('title')}>{source.name}</h3>
                <MarbleDiagram source={source} />
            </li>
        );
    }
}

export default connect((state, props) => ({
    source: state.sources[props.name],
}))(SourceListItem);
