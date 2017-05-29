import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import MarbleDiagram from '../components/MarbleDiagram.js';
import styles from './SourceList.css';

const cx = classNames.bind(styles);

class SourceList extends Component {
    render() {
        const { sources } = this.props;
        const list = Object.keys(sources).map(key => sources[key]);

        // show message if there is no source
        if (!list || !list.length) {
            return <p>No source yet.</p>;
        }

        // show source list
        return (
            <ol className={cx('list')}>
                {list.map(this.sourceLi)}
            </ol>
        );
    }

    sourceLi(source) {
        return (
            <li
                className={cx('item')}
                key={`${source.name}-${source.timestamp}`}
            >
                <h3 className={cx('title')}>{source.name}</h3>
                <MarbleDiagram source={source} />
            </li>
        );
    }
}

export default connect(state => ({
    sources: state.sources,
}))(SourceList);
