export default class RepeatIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly repeat: number,
  ) {}

  *[Symbol.iterator]() {
    for (let i = 0; i < this.repeat; i += 1) {
      for (const item of this.iterable) {
        yield item;
      }
    }
  }
}
