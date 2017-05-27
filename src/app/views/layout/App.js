import React, { Component } from 'react';
import classNames from 'classnames/bind';
import 'normalize.css';

import styles from './App.css';

const cx = classNames.bind(styles);

class App extends Component {
    render() {
        return (
            <div className={cx('app')}>
                App
            </div>
        );
    }
}

export default App;