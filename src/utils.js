function rangeCondition(minValue, maxValue) {
  return (item) => +minValue < item && item < +maxValue;
}

export const filterStrategies = {
  unixtimestamp: (data, code, { minValue, maxValue }) => {
    if (!minValue || !maxValue) return data;
    return data.filter((item) =>
      rangeCondition(new Date(minValue), new Date(maxValue))(item[code])
    );
  },
  number: (data, code, { minValue, maxValue }) => {
    if (!minValue || !maxValue) return data;
    return data.filter((item) =>
      rangeCondition(minValue, maxValue)(item[code])
    );
  },

  string: (data, code, value) =>
    data.filter((item) => new RegExp(value).test(item[code])),
};

export function formatData(columns, data) {
  const codes = columns.map((column) => column.code);
  return data.map((dataElem) =>
    Object.fromEntries(dataElem.map((value, index) => [codes[index], value]))
  );
}

export const EnumInputTypes = {
  UNIXTIMESTAMP: "unixtimestamp",
  NUMBER: "number",
};

export const EnumInputCustomTags = {
  RANGE_DATE: "range-date",
  RANGE_NUMBER: "range-number",
};
