import type { JinqItemTest } from "../types";

const first = <T>(iterable: Iterable<T>, test: JinqItemTest<T>): T => {
  for (const item of iterable) {
    if (test(item)) {
      return item;
    }
  }

  throw Error("item could not be found in iterable");
};

export default first;
