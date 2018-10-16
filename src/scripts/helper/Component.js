/**
 * A vanilla JS helper for creating state-based components
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */

/**
 * Create the Component object
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
'use strict';

document.componentRegistry = {};
document.nextId = 0;

class Component {
  constructor(props) {
    if (!props.elem)
      throw 'Component: You did not provide an element to make into a component.';

    this.state = {
      elem: props.elem,
      data: props.data || null
    };

    this.init();

    // window.addEventListener('load', () => this.init());

    window.onresize = this.onResize.bind(this);
    window.onscroll = this.onScroll.bind(this);
  }

  // Add the `setState()` method
  setState(props) {
    // Shallow merge new properties into state object
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        this.state.data[key] = props[key];
      }
    }
  }

  // lifecycle methods
  init() {}

  destroy() {}

  onResize() {}

  onScroll() {}
} // class Component

export default Component;
