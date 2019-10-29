
'use strict';

// import React from 'react';
// import './search.less';
// import logo from '../../../public/img/logo.png'
// import { common, a } from "../../utils/common";
const React = require('react')
const logo = require('../../../public/img/logo.png')
// const { common } = require('../../utils/common')
require('./search.less')

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }

    loadComponent() {
        import('./text.js').then( Text=> {
            if (this.state.Text) {
                this.setState({
                    Text: null
                })
            } else {
                this.setState({
                    Text: Text.default
                })
            }
        })
    }

    render() {
        const { Text } = this.state
        return <div className="search-text">
            {
                Text ? <Text/> : null
            }
            {/*<span>splitChunks:{common()}</span>*/}
            <span>搜索文字的内容 hot???</span>
            <img
                onClick={ this.loadComponent.bind(this) }
                src={ logo } />
        </div>
    }
}

module.exports = <Search />
