import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Component from '../helper/Component.js';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  init() {
    console.log('Accordion init');
    const { elem } = this.state;
    UIkit.use(Icons);
    UIkit.accordion(elem, {
      active: true
    });
  }
}
