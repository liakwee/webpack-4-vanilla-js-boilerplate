import 'babel-polyfill';
import $ from 'zepto-webpack';
// import UIkit from 'uikit';
import Navigo from 'navigo';
// import _ from 'lodash';
// import Icons from 'uikit/dist/js/uikit-icons';
// import printMe from './modules/print.js';
// import symbolData from '../icons/calendar.svg';
// import testdrive from '../icons/book-test-drive.svg';

import '../styles/style.scss';

const router = new Navigo();

router.on({
  '/pages/homepage.html': () => {
    console.log('HOMEPAGE');
  },
  '/pages/contact-us.html': () => {
    console.log('CONTACT US');
  }
});

console.log($('.uk-navbar'));

if ($('#test-module').length) {
  console.log('valid');
  import('./modules/print.js').then(func => {
    func.printMe();
  });
}

if ($('#accordion').length) {
  console.log('valid');
  import('./components/accordion.js').then(component => {
    const Component = component.default;
    const func = new Component('#accordion');
    func.init();
  });
}

// const files = require.context('../icons/', false, /.*\.svg$/);
// files.keys().forEach(files);

// console.log('START');
// printMe();
// UIkit.use(Icons);
// UIkit.notification('Hello world.');
