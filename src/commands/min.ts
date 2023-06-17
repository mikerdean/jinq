const min = <T>(iterable: Iterable<T>): T => {
  const values = [...iterable];
  if (values.length === 0) {
    throw Error("no values were found in this iterable");
  }

  let minValue: T = values[0];

  for (const item of values) {
    if (item < minValue) {
      minValue = item;
    }
  }

  return minValue;
};

export default min;
