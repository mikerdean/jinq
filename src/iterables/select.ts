import type { JinqItemSelect } from "../types.js";

export default class SelectIterable<T, U> implements Iterable<U> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly select: JinqItemSelect<T, U>,
  ) {}

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      yield this.select(item);
    }
  }
}
