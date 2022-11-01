class JinqIterable<T> {
  private readonly iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }
}

const create = <T>(iterable: Iterable<T>): JinqIterable<T> => {
  return new JinqIterable<T>(iterable);
};

export { create };
