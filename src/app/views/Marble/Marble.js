import React, { Component } from 'react';
import classNames from 'classnames/bind';

import SourceList from './sourceList/SourceList.js';
import styles from './Marble.css';

const cx = classNames.bind(styles);

class Marble extends Component {
    render() {
        // show source list
        return (
            <div className={cx('container')}>
                <SourceList className={cx('list')} />
                <div className={cx('sidebar')}>側欄</div>
            </div>
        );
    }
}

export default Marble;
