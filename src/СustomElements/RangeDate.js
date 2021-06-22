import { RangeInputElement } from "./RangeInputElement";

export class RangeDate extends RangeInputElement {
  constructor() {
    super();
    this.template = (minValue, maxValue) => `
          <input id="min" max="${maxValue}" value="${minValue}" type="date"/>
          <input id="max" min="${minValue}"  value="${maxValue}" type="date"/>
          `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}
