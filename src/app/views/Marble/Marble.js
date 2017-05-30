import React, { Component } from 'react';

import SourceList from './sourceList/SourceList.js';

class Marble extends Component {
    render() {
        // show source list
        return (
            <div>
                <SourceList />
                <div>側欄</div>
            </div>
        );
    }
}

export default Marble;
