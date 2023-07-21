export default class PrependIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly item: T,
  ) {}

  *[Symbol.iterator]() {
    yield this.item;

    for (const item of this.iterable) {
      yield item;
    }
  }
}
