import { ReverseIterable } from "../iterables";
import type { JinqItemTest } from "../types";

const last = <T>(iterable: Iterable<T>, test: JinqItemTest<T>): T => {
  const reversed = new ReverseIterable(iterable);

  for (const item of reversed) {
    if (test(item)) {
      return item;
    }
  }

  throw Error("item could not be found in iterable");
};

export default last;
