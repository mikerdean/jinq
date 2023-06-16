import type { JinqItemTest } from "../types";
import single, { SingleValueError } from "./single";

const singleOrDefault = <T>(
  iterable: Iterable<T>,
  test: JinqItemTest<T>,
  defaultValue: T
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
