import type { JinqGroupBy, JinqKeyMap } from "../types.js";

export default class GroupByIterable<TKey, TValue>
  implements Iterable<JinqGroupBy<TKey, TValue>>
{
  constructor(
    private readonly iterable: Iterable<TValue>,
    private readonly mapper: JinqKeyMap<TKey, TValue>,
  ) {}

  *[Symbol.iterator]() {
    const map = new Map<TKey, TValue[]>();

    for (const item of this.iterable) {
      const key = this.mapper(item);
      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)?.push(item);
    }

    for (const [key, values] of map) {
      yield { key, values };
    }
  }
}
