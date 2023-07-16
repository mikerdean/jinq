import type { JinqItemSelectMany } from "../types.js";

export default class SelectIterable<T, U> implements Iterable<U> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly selectMany: JinqItemSelectMany<T, U>
  ) {}

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      for (const innerItem of this.selectMany(item)) {
        yield innerItem;
      }
    }
  }
}
