import type { JinqItemTest } from "../types.js";

export default class WhereIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly test: JinqItemTest<T>
  ) {}

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      if (this.test(item)) {
        yield item;
      }
    }
  }
}
