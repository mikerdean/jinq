import type { JinqItemSelectMany } from "../types";

export default class SelectIterable<T, U> implements Iterable<U> {
  private readonly iterable: Iterable<T>;
  private readonly selectMany: JinqItemSelectMany<T, U>;

  constructor(iterable: Iterable<T>, selectMany: JinqItemSelectMany<T, U>) {
    this.iterable = iterable;
    this.selectMany = selectMany;
  }

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      for (const innerItem of this.selectMany(item)) {
        yield innerItem;
      }
    }
  }
}
