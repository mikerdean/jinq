export default class AppendIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly item: T,
  ) {}

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      yield item;
    }

    yield this.item;
  }
}
