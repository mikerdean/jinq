import { JinqItemTest } from "../types";

const all = <T>(iterable: Iterable<T>, test: JinqItemTest<T>): boolean => {
  let iterated = false;

  for (const item of iterable) {
    iterated = true;
    if (!test(item)) {
      return false;
    }
  }

  return iterated;
};

export default all;
