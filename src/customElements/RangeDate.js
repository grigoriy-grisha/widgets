import { RangeElement } from "./RangeElement";

export class RangeDate extends RangeElement {
  constructor() {
    super();
    this.template = (minValue, maxValue) => `
          <input id="min" max="${maxValue}" value="${minValue}" type="date"/>
          <input id="max" min="${minValue}"  value="${maxValue}" type="date"/>
          `;
  }

  minHandler({ target }) {
    this.value.minValue = target.value;
    setTimeout(() => this.dispatchEvent(new Event("input")));
    this.dispatchEvent(new Event("input"));
    this.update();
  }

  maxHandler({ target }) {
    this.value.maxValue = target.value;
    setTimeout(() => this.dispatchEvent(new Event("input")));
    this.update();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  update() {
    this.shadowRootElement.innerHTML = this.template(
      this.value.minValue,
      this.value.maxValue
    );
    this.setListeners();
  }
}
