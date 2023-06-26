export default class IntersectIterable<T> implements Iterable<T> {
  constructor(
    private readonly iterable: Iterable<T>,
    private readonly iterable2: Iterable<T>
  ) {}

  *[Symbol.iterator]() {
    const values = new Set<T>(this.iterable2);

    for (const item of this.iterable) {
      if (values.has(item)) {
        yield item;
      }
    }
  }
}
