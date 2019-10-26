
import { helloWebpack, testArrowFn } from './helloWebpack';
import { common } from "../../utils/common";

document.write( helloWebpack() );
document.write( `<br/><hr/>` );
document.write( (testArrowFn())() );
