'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './img/logo.png'

class Search extends React.Component {
    render() {
        return <div className="search-text">
            <span>Search Text hot???111</span>
            <img src={logo} />
        </div>;
    }
}

ReactDOM.render (
    <Search />,
    document.getElementById('root')
);
