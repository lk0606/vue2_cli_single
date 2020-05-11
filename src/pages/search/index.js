'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from '../../../public/img/logo.png'
import bg from '../../../public/img/bg.jpg'
import { common, a } from "../../utils/common";

class Index extends React.Component {
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
            <span>splitChunks:{common()}</span>
            <span>搜索文字的内容 hot???</span>
            <span>flat: {[1,[2,3]].flat()}</span>
            <img
                onClick={ this.loadComponent.bind(this) }
                src={ logo } />
            <img className="w400 h300" src={ bg } />
        </div>
    }
}
const root = document.createElement(`div`, {
    id: 'root'
})

ReactDOM.render (
    <Index />,
    // document.getElementById('root'),
    document.body.appendChild(root),
);
