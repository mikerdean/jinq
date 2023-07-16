import type { JinqItemTest } from "../types.js";
import last from "./last.js";

const lastOrDefault = <T>(
  iterable: Iterable<T>,
  test: JinqItemTest<T>,
  defaultValue: T
): T => {
  try {
    return last(iterable, test);
  } catch (e) {
    return defaultValue;
  }
};

export default lastOrDefault;
