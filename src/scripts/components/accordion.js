import UIkit from 'uikit';
// import { Accordion as accordion } from 'uikit/src/core/accordion.js';

export default class Accordion {
  constructor(id) {
    this.id = id;
  }

  init() {
    console.log('Accordion init', this.id);
  }
}
