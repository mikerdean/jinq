import { JinqItemTest } from "../types";

export default class WhereIterable<T> implements Iterable<T> {
  private readonly iterable: Iterable<T>;
  private readonly test: JinqItemTest<T>;

  constructor(iterable: Iterable<T>, test: JinqItemTest<T>) {
    this.iterable = iterable;
    this.test = test;
  }

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      if (this.test(item)) {
        yield item;
      }
    }
  }
}
