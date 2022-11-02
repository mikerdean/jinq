import { JinqItemTest } from "../types";

const single = <T>(iterable: Iterable<T>, test: JinqItemTest<T>): T => {
  const items: T[] = [];

  for (const item of iterable) {
    if (test(item)) {
      items.push(item);
    }

    if (items.length > 1) {
      break;
    }
  }

  if (items.length > 1) {
    throw Error(
      "more than one item was found in this iterable matching your test"
    );
  }

  if (items.length === 1) {
    return items[0];
  }

  throw Error("item could not be found in iterable");
};

export default single;
