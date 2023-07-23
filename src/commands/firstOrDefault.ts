import type { JinqItemTest } from "../types.js";

const firstOrDefault = <T>(
  iterable: Iterable<T>,
  defaultValue: T,
  test?: JinqItemTest<T>,
): T => {
  for (const item of iterable) {
    if (!test) {
      return item;
    } else if (test(item)) {
      return item;
    }
  }

  return defaultValue;
};

export default firstOrDefault;
