import type { JinqItemTest } from "../types.js";

const any = <T>(iterable: Iterable<T>, test: JinqItemTest<T>): boolean => {
  for (const item of iterable) {
    if (test(item)) {
      return true;
    }
  }

  return false;
};

export default any;
