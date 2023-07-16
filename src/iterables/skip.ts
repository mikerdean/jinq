export default class SkipIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly num: number,
  ) {}

  *[Symbol.iterator]() {
    let count = 0;

    for (const item of this.iterable) {
      if (count < this.num) {
        count += 1;
        continue;
      }

      yield item;
    }
  }
}
