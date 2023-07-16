import { JinqIterable } from "./jinqIterable.js";

export const jinq = <T>(iterable: Iterable<T>): JinqIterable<T> => {
  return new JinqIterable<T>(iterable);
};
