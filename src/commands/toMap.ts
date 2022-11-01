import { JinqKeyMap } from "../types";

const toMap = <T, U>(
  iterable: Iterable<T>,
  keyMapper: JinqKeyMap<T, U>
): Map<U, T> => {
  const map = new Map<U, T>();
  for (const item of iterable) {
    map.set(keyMapper(item), item);
  }

  return map;
};

export default toMap;
