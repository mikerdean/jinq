import JinqIterable from "../jinqIterable";
import { JinqItemTest } from "../types";

export default class WhereIterable<T> extends JinqIterable<T> {
  private readonly test: JinqItemTest<T>;

  constructor(iterable: Iterable<T>, test: JinqItemTest<T>) {
    super(iterable);
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
