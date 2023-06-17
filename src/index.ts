import JinqIterable from "./jinqIterable";

export const jinq = <T>(iterable: Iterable<T>): JinqIterable<T> => {
  return new JinqIterable<T>(iterable);
};
