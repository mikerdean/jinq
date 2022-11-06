import JinqIterable from "./jinqIterable";

const jinq = <T>(iterable: Iterable<T>): JinqIterable<T> => {
  return new JinqIterable<T>(iterable);
};

export default jinq;
