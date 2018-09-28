import 'babel-polyfill';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import printMe from './modules/print.js';
import '../styles/style.scss';

console.log('START');
printMe();
UIkit.use(Icons);
UIkit.notification('Hello world.');
