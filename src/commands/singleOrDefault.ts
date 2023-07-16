import type { JinqItemTest } from "../types.js";
import single, { SingleValueError } from "./single.js";

const singleOrDefault = <T>(
  iterable: Iterable<T>,
  test: JinqItemTest<T>,
  defaultValue: T,
): T => {
  try {
    return single(iterable, test);
  } catch (e) {
    if (e instanceof SingleValueError) {
      throw e;
    }

    return defaultValue;
  }
};

export default singleOrDefault;
