import {
  all,
  any,
  count,
  first,
  firstOrDefault,
  single,
  singleOrDefault,
  toArray,
  toMap,
  toSet,
} from "./commands";
import { WhereIterable } from "./iterables";
import { JinqItemTest, JinqKeyMap } from "./types";

class JinqIterable<T> implements Iterable<T> {
  protected readonly iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  all(test: JinqItemTest<T>): boolean {
    return all(this.iterable, test);
  }

  any(test: JinqItemTest<T>): boolean {
    return any(this.iterable, test);
  }

  count(test: JinqItemTest<T>): number {
    return count(this.iterable, test);
  }

  first(test: JinqItemTest<T>): T {
    return first(this.iterable, test);
  }

  firstOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return firstOrDefault(this.iterable, test, defaultValue);
  }

  single(test: JinqItemTest<T>): T {
    return single(this.iterable, test);
  }

  singleOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return singleOrDefault(this.iterable, test, defaultValue);
  }

  toArray(): T[] {
    return toArray(this.iterable);
  }

  toMap<TKey>(keyMapper: JinqKeyMap<TKey, T>): Map<TKey, T> {
    return toMap(this.iterable, keyMapper);
  }

  toSet(): Set<T> {
    return toSet(this.iterable);
  }

  where(test: JinqItemTest<T>): JinqIterable<T> {
    return new WhereIterable(this.iterable, test);
  }

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      yield item;
    }
  }
}

export default JinqIterable;
