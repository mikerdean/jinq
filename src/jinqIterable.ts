import {
  aggregate,
  all,
  any,
  count,
  first,
  firstOrDefault,
  last,
  lastOrDefault,
  max,
  min,
  single,
  singleOrDefault,
  toArray,
  toMap,
  toSet,
} from "./commands";
import {
  GroupByIterable,
  RepeatIterable,
  ReverseIterable,
  SelectIterable,
  SelectManyIterable,
  SkipIterable,
  TakeIterable,
  WhereIterable,
} from "./iterables";
import type {
  JinqAccumulator,
  JinqItemSelect,
  JinqItemSelectMany,
  JinqItemTest,
  JinqKeyMap,
} from "./types";

class JinqIterable<T> implements Iterable<T> {
  private iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  aggregate<TAccumulate>(
    seed: TAccumulate,
    accumulator: JinqAccumulator<T, TAccumulate>
  ): TAccumulate {
    return aggregate(this.iterable, seed, accumulator);
  }

  all(test: JinqItemTest<T>): boolean {
    return all(this.iterable, test);
  }

  any(test: JinqItemTest<T>): boolean {
    return any(this.iterable, test);
  }

  contains(item: T): boolean {
    return any(this.iterable, (value) => Object.is(value, item));
  }

  count(test?: JinqItemTest<T>): number {
    return count(this.iterable, test);
  }

  first(test: JinqItemTest<T>): T {
    return first(this.iterable, test);
  }

  firstOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return firstOrDefault(this.iterable, test, defaultValue);
  }

  groupBy<TKey>(key: JinqKeyMap<TKey, T>) {
    return new GroupByIterable<TKey, T>(this.iterable, key);
  }

  last(test: JinqItemTest<T>): T {
    return last(this.iterable, test);
  }

  lastOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return lastOrDefault(this.iterable, test, defaultValue);
  }

  max(): T {
    return max(this.iterable);
  }

  min(): T {
    return min(this.iterable);
  }

  repeat(times: number): JinqIterable<T> {
    this.iterable = new RepeatIterable(this.iterable, times);
    return this;
  }

  reverse(): JinqIterable<T> {
    this.iterable = new ReverseIterable(this.iterable);
    return this;
  }

  select<U>(select: JinqItemSelect<T, U>): JinqIterable<U> {
    return new JinqIterable(new SelectIterable(this.iterable, select));
  }

  selectMany<U>(select: JinqItemSelectMany<T, U>): JinqIterable<U> {
    return new JinqIterable(new SelectManyIterable(this.iterable, select));
  }

  single(test: JinqItemTest<T>): T {
    return single(this.iterable, test);
  }

  singleOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return singleOrDefault(this.iterable, test, defaultValue);
  }

  skip(num: number): JinqIterable<T> {
    this.iterable = new SkipIterable(this.iterable, num);
    return this;
  }

  take(num: number): JinqIterable<T> {
    this.iterable = new TakeIterable(this.iterable, num);
    return this;
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
    this.iterable = new WhereIterable(this.iterable, test);
    return this;
  }

  *[Symbol.iterator]() {
    for (const item of this.iterable) {
      yield item;
    }
  }
}

export default JinqIterable;
