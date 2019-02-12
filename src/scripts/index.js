'use strict';

import 'babel-polyfill';
import $ from 'jquery';
// import UIkit from 'uikit';
import moduleLoader from './modules/module-loader';

import '../styles/style.scss';

window.jQuery = $;
window.$ = $;

const files = require.context('../icons/', false, /.*\.svg$/);
files.keys().forEach(files);

// UIkit.use(Icons);

const autoInitComponents = () => {
  $('[data-component]')
    .toArray()
    .map(elm => {
      const componentName = $(elm).data('component');
      moduleLoader(componentName).then(Component => {
        new Component({ elem: elm });
      });
    });
};

autoInitComponents();
