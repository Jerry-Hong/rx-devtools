import React, { Component } from 'react';

import classNames from 'classnames/bind';
import 'normalize.css';

import styles from './App.css';

const cx = classNames.bind(styles);

class App extends Component {
    render() {
        return (
            <div className={cx('app')}>
                <h1>RxJs Devtool</h1>
                {this.props.children || <p>Welcome to RxJs Devtool =D</p>}
            </div>
        );
    }
}

export default App;
