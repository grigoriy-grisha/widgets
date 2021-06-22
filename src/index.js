import { RangeDate } from "./СustomElements/RangeDate";
import { RangeNumber } from "./СustomElements/RangeNumber";

import { VisualWidget } from "./Widgets/VisualWidget";
import { FilterWidget } from "./Widgets/FilterWidget";

import { EnumInputCustomTags, formatData } from "./utils";
import { data } from "../data";

customElements.define(EnumInputCustomTags.RANGE_DATE, RangeDate);
customElements.define(EnumInputCustomTags.RANGE_NUMBER, RangeNumber);

const template = (data) =>
  `<div style="display: flex; justify-content: space-between;width: 500px">
         <div>${data.id}</div>
         <div>${data.name}</div>
         <div>${data.category}</div>
         <div>${data.date}</div>
         <div>${data.value}</div>
     </div>`;

const visualWidget = new VisualWidget(
  document.querySelector("#visual-widget"),
  formatData(data.columns, data.data),
  template
);
visualWidget.render();

new FilterWidget(document.querySelector("#filter-widget"), data).subscribe(
  (data) => {
    visualWidget.setData(data);
    visualWidget.render();
  }
);

const visualWidget2 = new VisualWidget(
  document.querySelector("#visual-widget1"),
  formatData(data.columns, data.data),
  template
);
visualWidget2.render();

new FilterWidget(document.querySelector("#filter-widget2"), data).subscribe(
  (data) => {
    visualWidget2.setData(data);
    visualWidget2.render();
  }
);
