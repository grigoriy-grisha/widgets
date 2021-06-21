export class RangeElement extends HTMLElement {
  constructor() {
    super();
    this.value = { minValue: "", maxValue: "" };
    this.minHandler = this.minHandler.bind(this);
    this.maxHandler = this.maxHandler.bind(this);
    this.template = (minValue, maxValue) => `
          <input id="min" max="${maxValue}" value="${minValue}" type="date"/>
          <input id="max" min="${minValue}"  value="${maxValue}" type="date"/>
          `;

    this.shadowRootElement = this.attachShadow({ mode: "open" });
  }

  findMin() {
    return this.shadowRootElement.querySelector("#min");
  }

  findMax() {
    return this.shadowRootElement.querySelector("#max");
  }

  setListeners() {
    this.findMin().addEventListener("input", this.minHandler);
    this.findMax().addEventListener("input", this.maxHandler);
  }

  connectedCallback() {
    this.shadowRootElement.innerHTML = this.template(
      this.value.minValue,
      this.value.maxValue
    );
    this.setListeners();
  }
}
