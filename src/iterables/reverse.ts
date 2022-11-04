export default class ReverseIterable<T> implements Iterable<T> {
  private readonly iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  *[Symbol.iterator]() {
    const arr = [...this.iterable];

    for (let i = arr.length - 1; i >= 0; i -= 1) {
      yield arr[i];
    }
  }
}
