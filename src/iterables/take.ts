export default class TakeIterable<T> implements Iterable<T> {
  private readonly iterable: Iterable<T>;
  private readonly num: number;

  constructor(iterable: Iterable<T>, num: number) {
    this.iterable = iterable;
    this.num = num;
  }

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
