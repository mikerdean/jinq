import { ReverseIterable } from "iterables/index.js";
import type { JinqItemTest } from "../types.js";

const lastOrDefault = <T>(
  iterable: Iterable<T>,
  defaultValue: T,
  test?: JinqItemTest<T>,
): T => {
  const reversed = new ReverseIterable(iterable);

  for (const item of reversed) {
    if (!test) {
      return item;
    } else if (test(item)) {
      return item;
    }
  }

  return defaultValue;
};

export default lastOrDefault;
