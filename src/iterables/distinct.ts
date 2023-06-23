export default class DistinctIterable<T> implements Iterable<T> {
  constructor(private readonly iterable: Iterable<T>) {}

  *[Symbol.iterator]() {
    const values = new Set<T>();

    for (const item of this.iterable) {
      if (!values.has(item)) {
        values.add(item);
        yield item;
      }
    }
  }
}
