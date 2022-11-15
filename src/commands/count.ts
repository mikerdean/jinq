import { JinqItemTest } from "../types";

const count = <T>(iterable: Iterable<T>, test?: JinqItemTest<T>): number => {
  let count = 0;
  for (const item of iterable) {
    if (test === undefined || test(item)) {
      count += 1;
    }
  }

  return count;
};

export default count;
