export default class ReverseIterable<T> implements Iterable<T> {
  constructor(private readonly iterable: Iterable<T>) {}

  *[Symbol.iterator]() {
    const arr = [...this.iterable];

    for (let i = arr.length - 1; i >= 0; i -= 1) {
      yield arr[i];
    }
  }
}
