import { data } from "../data";
import { RangeDate } from "./customElements/RangeDate";
import { RangeNumber } from "./customElements/RangeNumber";
import { filterStrategies } from "./utils";

customElements.define("range-date", RangeDate);
customElements.define("range-number", RangeNumber);

const CHANGE_DATE_EVENT = "changeData";

const template = (data) =>
  `<div style="display: flex; justify-content: space-between;width: 500px">
         <div>${data.id}</div>
         <div>${data.name}</div>
         <div>${data.category}</div>
         <div>${data.date}</div>
         <div>${data.value}</div>
     </div>`;

function formatData(columns, data) {
  const codes = columns.map((column) => column.code);
  return data.map((dataElem) =>
    Object.fromEntries(dataElem.map((value, index) => [codes[index], value]))
  );
}

class VisualWidget {
  constructor(elem, data, template) {
    this.elem = elem;
    this.template = template;
    this.data = data;
    this._render();
  }

  _render() {
    this.elem.innerHTML = "";
    this.data.forEach((dataElem) =>
      this.elem.insertAdjacentHTML("beforeend", this.template(dataElem))
    );
  }
}

class FilterWidget {
  constructor(elem, data) {
    this.elem = elem;
    this.columns = data.columns;
    this.formatData = formatData(data.columns, data.data);
    this._render();
  }

  _render() {
    this.columns.forEach((column) => {
      const input = this.createInput(column.type);
      this.addListener(input, column.code, column.type);
      this.elem.appendChild(input);
    });
  }

  createInput(type) {
    let inputName = "input";
    if (type === "unixtimestamp") inputName = "range-date";
    if (type === "number") inputName = "range-number";

    const inputElement = document.createElement(inputName);
    inputElement.setAttribute("type", type);
    return inputElement;
  }

  listenerHandler(code, type) {
    return ({ target }) => {
      dispatchEvent(
        new CustomEvent(CHANGE_DATE_EVENT, {
          detail: this.filterData(code, target.value, type),
        })
      );
    };
  }

  addListener(elem, code, type) {
    elem.addEventListener("input", this.listenerHandler(code, type));
  }

  filterData(code, value, type) {
    return filterStrategies[type](this.formatData, code, value);
  }

  on(callback) {
    addEventListener(CHANGE_DATE_EVENT, callback);
  }
}

new FilterWidget(document.querySelector("#filter-widget"), data).on(
  ({ detail }) => {
    new VisualWidget(
      document.querySelector("#visual-widget"),
      detail,
      template
    );
  }
);
