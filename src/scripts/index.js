'use strict';

import 'babel-polyfill';
import $ from 'jquery';
// import UIkit from 'uikit';
// import _ from 'lodash';
// import Icons from 'uikit/dist/js/uikit-icons';
// import printMe from './modules/print.js';
// import symbolData from '../icons/calendar.svg';
// import testdrive from '../icons/book-test-drive.svg';

import '../styles/style.scss';

const files = require.context('../icons/', false, /.*\.svg$/);
files.keys().forEach(files);

// UIkit.use(Icons);

const autoInitComponents = () => {
  $('[data-component]')
    .toArray()
    .map(elm => {
      const componentName = $(elm).data('component');
      import(`./components/${componentName}.js`).then(component => {
        const Component = component.default;
        new Component({ elem: $(elm) });
      });
    });
};

autoInitComponents();
