export type JinqItemTest<T> = (item: T) => boolean;
export type JinqItemSelect<T, U> = (item: T) => U;
export type JinqItemSelectMany<T, U> = (item: T) => Iterable<U>;
export type JinqKeyMap<TKey, TValue> = (item: TValue) => TKey;
export type JinqGroupBy<TKey, TValue> = { key: TKey; values: TValue[] };
export type JinqAccumulator<T, TAccumulate> = (
  accumulated: TAccumulate,
  current: T
) => TAccumulate;
