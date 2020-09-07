
import { helloWebpack, testArrowFn } from './helloWebpack';
// import { common } from "../../utils/common";
import { Button, Page, Header } from '@wont/react-ui'
import React from 'react'
import ReactDOM from 'react-dom';
ReactDOM.render(
    <div>
        <Button
            label = "@wont"
            primary
        />
        {/* <Page /> */}
        < Header />

    </div>,
    document.getElementById('root'))
document.write( helloWebpack() );
document.write( `<br/><hr/>` );
document.write( (testArrowFn())() );
