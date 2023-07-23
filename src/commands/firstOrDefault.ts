import type { JinqItemTest } from "../types.js";
import first from "./first.js";

const firstOrDefault = <T>(
  iterable: Iterable<T>,
  defaultValue: T,
  test?: JinqItemTest<T>,
): T => {
  try {
    return first(iterable, test);
  } catch (e) {
    return defaultValue;
  }
};

export default firstOrDefault;
