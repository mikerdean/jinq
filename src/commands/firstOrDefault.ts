import { JinqItemTest } from "../types";
import first from "./first";

const firstOrDefault = <T>(
  iterable: Iterable<T>,
  test: JinqItemTest<T>,
  defaultValue: T
): T => {
  try {
    return first(iterable, test);
  } catch (e) {
    return defaultValue;
  }
};

export default firstOrDefault;
