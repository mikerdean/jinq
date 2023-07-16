import type { JinqItemTest } from "../types.js";
import first from "./first.js";

const firstOrDefault = <T>(
  iterable: Iterable<T>,
  test: JinqItemTest<T>,
  defaultValue: T,
): T => {
  try {
    return first(iterable, test);
  } catch (e) {
    return defaultValue;
  }
};

export default firstOrDefault;
