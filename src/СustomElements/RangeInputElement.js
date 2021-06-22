export class RangeInputElement extends HTMLElement {
  constructor() {
    super();
    this.value = { minValue: "", maxValue: "" };
    this.minHandler = this.minHandler.bind(this);
    this.maxHandler = this.maxHandler.bind(this);
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

  minHandler({ target }) {
    this.value.minValue = target.value;
    this.findMax().setAttribute("min", this.value.minValue);
    this.findMin().setAttribute("value", this.value.minValue);
  }

  maxHandler({ target }) {
    this.value.maxValue = target.value;
    this.findMin().setAttribute("max", this.value.maxValue);
    this.findMax().setAttribute("value", this.value.maxValue);
  }
}
