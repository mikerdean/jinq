import type { JinqItemTest } from "../types.js";

const first = <T>(iterable: Iterable<T>, test?: JinqItemTest<T>): T => {
  for (const item of iterable) {
    if (!test) {
      return item;
    } else if (test(item)) {
      return item;
    }
  }

  throw Error("item could not be found in iterable");
};

export default first;
