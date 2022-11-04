import { JinqKeyMap } from "../types";

const toMap = <TKey, TValue>(
  iterable: Iterable<TValue>,
  keyMapper: JinqKeyMap<TKey, TValue>
): Map<TKey, TValue> => {
  const map = new Map<TKey, TValue>();
  for (const item of iterable) {
    map.set(keyMapper(item), item);
  }

  return map;
};

export default toMap;
