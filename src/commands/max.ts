const max = <T>(iterable: Iterable<T>): T => {
  const values = [...iterable];
  if (values.length === 0) {
    throw Error("no values were found in this iterable");
  }

  let maxValue: T = values[0];

  for (const item of values) {
    if (item > maxValue) {
      maxValue = item;
    }
  }

  return maxValue;
};

export default max;
