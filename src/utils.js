export const filterStrategies = {
  unixtimestamp: (data, code, value) =>
    data.filter(
      (item) =>
        new Date(value.minValue).valueOf() < item[code] &&
        item[code] < new Date(value.maxValue).valueOf()
    ),

  string: (data, code, value) =>
    data.filter((item) => new RegExp(value).test(item[code])),

  number: (data, code, value) =>
    data.filter(
      (item) => +value.minValue < item[code] && item[code] < +value.maxValue
    ),
};
