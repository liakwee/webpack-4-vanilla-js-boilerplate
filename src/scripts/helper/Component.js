'use strict';
import merge from 'deepmerge';

class Component {
  constructor(props) {
    if (!props.elem) {
      throw 'Component: You did not provide an element to make into a component.';
    }

    this.state = {
      elem: props.elem,
      data: props.data || null
    };

    this.init = this.init.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);

    window.addEventListener('load', () => this.init());
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
  }

  // Add the `setState()` method
  setState(props) {
    // Shallow merge new properties into state object
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        this.state[key] = props[key];
      }
    }
  }

  // lifecycle methods
  init() {
    console.log('Components Init');
  }

  destroy() {}

  onResize() {}

  onScroll() {}
} // class Component

export default Component;
