import { NextSubject } from "../Observable/NextSubject";

import {
  EnumInputCustomTags,
  EnumInputTypes,
  filterStrategies,
  formatData,
} from "../utils";

function getInputTag(type) {
  switch (type) {
    case EnumInputTypes.UNIXTIMESTAMP:
      return EnumInputCustomTags.RANGE_DATE;
    case EnumInputTypes.NUMBER:
      return EnumInputCustomTags.RANGE_NUMBER;
    default:
      return "input";
  }
}

export class FilterWidget {
  constructor(container, data) {
    this.container = container;
    this.columns = data.columns;
    this.formatData = formatData(data.columns, data.data);
    this.nextObservable$ = new NextSubject();
    this._render();
  }

  subscribe(callback) {
    this.nextObservable$.subscribe(callback);
  }

  _render() {
    this.columns.forEach((column) => {
      const input = this._createInput(column.type);
      this._addListener(input, column.code, column.type);

      this.container.appendChild(document.createTextNode(column.label));
      this.container.appendChild(input);
    });
  }

  _createInput(type) {
    const inputElement = document.createElement(getInputTag(type));
    inputElement.setAttribute("type", type);
    return inputElement;
  }

  _listenerHandler(code, type) {
    return ({ target }) => {
      this.nextObservable$.next(this._filterData(code, target.value, type));
    };
  }

  _addListener(elem, code, type) {
    elem.addEventListener("input", this._listenerHandler(code, type));
  }

  _filterData(code, value, type) {
    return filterStrategies[type](this.formatData, code, value);
  }
}
