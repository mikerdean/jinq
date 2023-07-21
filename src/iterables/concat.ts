export default class ConcatIterable<T> implements Iterable<T> {
  constructor(private readonly iterables: Iterable<Iterable<T>>) {}

  *[Symbol.iterator]() {
    for (const iterable of this.iterables) {
      for (const item of iterable) {
        yield item;
      }
    }
  }
}
