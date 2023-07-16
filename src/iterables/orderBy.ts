import type { Direction, JinqItemSelect } from "../types.js";

export default class OrderByIterable<T, U> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly select: JinqItemSelect<T, U>,
    private readonly direction: Direction
  ) {}

  *[Symbol.iterator]() {
    const original = [...this.iterable];
    if (original.length === 0) {
      return;
    }

    const ordered = original
      .map((item, index) => ({ value: this.select(item), index }))
      .sort((a, b) => {
        const value1 = a.value;
        const value2 = b.value;

        if (value1 === value2) {
          return 0;
        } else if (this.direction === "asc") {
          return value1 < value2 ? -1 : 1;
        } else {
          return value1 > value2 ? -1 : 1;
        }
      });

    for (let i = 0; i < ordered.length; i += 1) {
      const { index } = ordered[i];
      yield original[index];
    }
  }
}
