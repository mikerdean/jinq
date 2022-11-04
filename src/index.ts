import JinqIterable from "./jinqIterable";

const create = <T>(iterable: Iterable<T>): JinqIterable<T> => {
  return new JinqIterable<T>(iterable);
};

export { create };
