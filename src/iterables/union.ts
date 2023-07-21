export default class UnionIterable<T> implements Iterable<T> {
  constructor(private readonly iterables: Iterable<Iterable<T>>) {}

  *[Symbol.iterator]() {
    const store = new Set<T>();

    for (const iterable of this.iterables) {
      for (const item of iterable) {
        if (!store.has(item)) {
          store.add(item);
          yield item;
        }
      }
    }
  }
}
