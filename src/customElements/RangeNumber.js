import { RangeElement } from "./RangeElement";

export class RangeNumber extends RangeElement {
  constructor() {
    super();
    this.template = (minValue, maxValue) => `
          <input id="min" max="${maxValue}" value="${minValue}" type="number"/>
          <input id="max" min="${minValue}"  value="${maxValue}" type="number"/>
          `;
  }
  minHandler({ target }) {
    this.value.minValue = target.value;
    this.dispatchEvent(new Event("input"));
    this.findMax().setAttribute("min", this.value.minValue);
    this.findMin().setAttribute("value", this.value.minValue);
  }

  maxHandler({ target }) {
    this.value.maxValue = target.value;
    this.dispatchEvent(new Event("input"));
    this.findMin().setAttribute("max", this.value.minValue);
    this.findMax().setAttribute("value", this.value.minValue);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}
