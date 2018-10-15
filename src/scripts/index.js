import 'babel-polyfill';
import UIkit from 'uikit';
// import _ from 'lodash';
import Icons from 'uikit/dist/js/uikit-icons';
import printMe from './modules/print.js';
// import symbolData from '../icons/calendar.svg';
// import testdrive from '../icons/book-test-drive.svg';
import '../styles/style.scss';

const files = require.context('../icons/', false, /.*\.svg$/);
files.keys().forEach(files);

console.log('START');
printMe();
UIkit.use(Icons);
UIkit.notification('Hello world.');
