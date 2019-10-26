'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from '../../../public/img/logo.png'
import { common, a } from "../../utils/common";

class Search extends React.Component {
    render() {
        return <div className="search-text">
            <span>splitChunks:{common()}</span>
            <span>Search Text hot???</span>
            <img src={logo} />
        </div>
    }
}

ReactDOM.render (
    <Search />,
    document.getElementById('root')
);
