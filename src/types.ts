export type JinqItemTest<T> = (item: T) => boolean;
export type JinqItemSelect<T, U> = (item: T) => U;
export type JinqKeyMap<TKey, TValue> = (item: TValue) => TKey;
