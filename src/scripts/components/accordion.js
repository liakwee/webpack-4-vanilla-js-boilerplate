import UIkit from 'uikit';
import Component from '../helper/Component.js';
// import { Accordion as accordion } from 'uikit/src/core/accordion.js';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    console.log('Accordion init');
    const { elem } = this.state;
    UIkit.accordion(elem, {
      active: true
    });
  }
}
