import type { JinqItemSelect } from "../types";

export default class SelectIterable<T, U> implements Iterable<U> {
  private readonly iterable: Iterable<T>;
  private readonly select: JinqItemSelect<T, U>;

  constructor(iterable: Iterable<T>, select: JinqItemSelect<T, U>) {
    this.iterable = iterable;
    this.select = select;
  }

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      yield this.select(item);
    }
  }
}
