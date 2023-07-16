export default class TakeIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly num: number,
  ) {}

  *[Symbol.iterator]() {
    let count = 0;

    for (const item of this.iterable) {
      if (count >= this.num) {
        break;
      }

      count += 1;
      yield item;
    }
  }
}
