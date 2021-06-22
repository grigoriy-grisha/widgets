import { RangeInputElement } from "./RangeInputElement";

export class RangeNumber extends RangeInputElement {
  constructor() {
    super();
    this.template = (minValue, maxValue) => `
          <input id="min" max="${maxValue}" value="${minValue}" type="number"/>
          <input id="max" min="${minValue}"  value="${maxValue}" type="number"/>
          `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}
