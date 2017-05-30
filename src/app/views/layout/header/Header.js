import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import classNames from 'classnames/bind';

import logo from './rxjs-logo.png';
import styles from './Header.css';

const cx = classNames.bind(styles);

class Header extends Component {
    render() {
        const { router: { isActive } } = this.props;

        return (
            <header className={cx('header')}>
                <img className={cx('logo')} src={logo} alt="logo" />
                <div className={cx('menu')}>
                    <div
                        className={cx('menu-item', {
                            active: isActive('marble'),
                        })}
                    >
                        <Link to="/marble">
                            Marble Diagram
                        </Link>
                    </div>
                    <div
                        className={cx('menu-item', {
                            active: isActive('relation'),
                        })}
                    >
                        <Link to="/relation">
                            Relation Diagram
                        </Link>
                    </div>
                    <div className={cx('menu-line')} />
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
