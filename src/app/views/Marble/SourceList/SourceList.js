import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import SourceListItem from './SourceListItem.js';
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
                {list.map(source => (
                    <SourceListItem
                        key={`${source.name}-${source.timestamp}`}
                        name={source.name}
                    />
                ))}
            </ol>
        );
    }
}

export default connect(state => ({
    sources: state.sources,
}))(SourceList);
