export default class RepeatIterable<T> implements Iterable<T> {
  private readonly iterable: Iterable<T>;
  private readonly repeat: number;

  constructor(iterable: Iterable<T>, repeat: number) {
    this.iterable = iterable;
    this.repeat = repeat;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.repeat; i += 1) {
      for (const item of this.iterable) {
        yield item;
      }
    }
  }
}
