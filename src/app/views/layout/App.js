import React, { Component } from 'react';
import classNames from 'classnames/bind';
import 'normalize.css';

import Header from './header/Header.js';
import styles from './App.css';

const cx = classNames.bind(styles);

class App extends Component {
    render() {
        return (
            <div className={cx('app')}>
                <Header />
                {this.props.children || <p>Welcome to RxJs Devtool =D</p>}
            </div>
        );
    }
}

export default App;
