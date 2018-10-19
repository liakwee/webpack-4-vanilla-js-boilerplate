'use strict';

import Component from '../helper/Component.js';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };

    let elTop = 0,
      isScroll = false;
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
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(f) {
        return setTimeout(f, 1000 / 60);
      }; // simulate calling code 60
  }

  onScroll() {
    this.elTop =
      parseInt(window.getComputedStyle(this.state.elem).getPropertyValue('top')) +
      this.state.wScrollDiff;
    window.requestAnimationFrame(this.scrollLoop.bind(this));
  }

  scrollLoop() {
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

    if (wScrollCurrent <= 0) {
      elem.style.top = '0px';
    } else if (wScrollDiff > 0) {
      elem.style.top = (this.elTop > 0 ? 0 : this.elTop) + 'px';
    } else if (wScrollDiff < 0) {
      if (wScrollCurrent + wHeight >= dHeight - elHeight) {
        // scrolled to the very bottom; element slides in
        elem.style.top =
          ((this.elTop = wScrollCurrent + wHeight - dHeight) < 0 ? this.elTop : 0) + 'px';
      } else {
        // scrolled down; element slides out
        elem.style.top = (Math.abs(this.elTop) > elHeight ? -elHeight : this.elTop) + 'px';
      }
    }

    if (this.elTop < -80 || this.elTop === 0) {
      window.requestAnimationFrame(this.scrollLoop.bind(this));
    }

    this.setState({ wScrollBefore: wScrollCurrent });
  }
}
