import { ReverseIterable } from "../iterables/index.js";
import type { JinqItemTest } from "../types.js";

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
