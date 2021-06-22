export class VisualWidget {
  constructor(container, data, template) {
    this.container = container;
    this.template = template;
    this.data = data;
  }

  render() {
    this.clear();
    this.data.forEach((dataElem) =>
      this.container.insertAdjacentHTML("beforeend", this.template(dataElem))
    );
  }

  clear() {
    this.container.innerHTML = "";
  }

  setData(data) {
    this.data = data;
  }
}
