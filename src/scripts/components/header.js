'use strict';

import Component from '../helper/Component.js';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  init() {
    const INITIAL_STATE = {
      elHeight: 0,
      elTop: 0,
      dHeight: 0,
      wHeight: 0,
      wScrollCurrent: 0,
      wScrollBefore: 0,
      wScrollDiff: 0
    };
    this.setState({ INITIAL_STATE });
    console.log('Header init', this.state);
  }

  onScroll() {
    const {
      elem,
      wScrollDiff,
      dHeight,
      elHeight,
      wHeight,
      wScrollBefore,
      wScrollCurrent
    } = this.state;

    this.setState({
      elHeight: elem.offsetHeight,
      dHeight: document.body.offsetHeight,
      wHeight: window.innerHeight,
      wScrollCurrent: window.pageYOffset,
      wScrollDiff: wScrollBefore - wScrollCurrent
    });

    let elTop =
      parseInt(window.getComputedStyle(this.state.elem).getPropertyValue('top')) +
      this.state.wScrollDiff;

    if (wScrollCurrent <= 0) {
      elem.style.top = '0px';
    } else if (wScrollDiff > 0) {
      elem.style.top = (elTop > 0 ? 0 : elTop) + 'px';
    } else if (wScrollDiff < 0) {
      if (wScrollCurrent + wHeight >= dHeight - elHeight) {
        // scrolled to the very bottom; element slides in
        elem.style.top = ((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0) + 'px';
      } else {
        // scrolled down; element slides out
        elem.style.top = (Math.abs(elTop) > elHeight ? -elHeight : elTop) + 'px';
      }
    }

    this.setState({ wScrollBefore: wScrollCurrent });
  }
}
