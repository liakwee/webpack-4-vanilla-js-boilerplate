import UIkit from 'uikit';
import Component from '../helper/Component.js';
// import { Accordion as accordion } from 'uikit/src/core/accordion.js';

export default class Accordion extends Component {
  constructor(props) {
    super(props); // calling super() so that the correct prototype chain is established.
    console.log('props: ', props);
  }

  init() {
    const { elem } = this.state;
    console.log('Accordion init', elem.find('li').length);
  }
}
