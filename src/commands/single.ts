import { JinqItemTest } from "../types";

export class SingleValueError<T> extends Error {
  readonly items: T[];

  constructor(message: string, items: T[]) {
    super(message);
    this.items = items;
  }
}

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
    throw new SingleValueError<T>(
      "more than one item was found in this iterable matching your test",
      items
    );
  }

  if (items.length === 1) {
    return items[0];
  }

  throw Error("item could not be found in iterable");
};

export default single;
