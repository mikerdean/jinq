import ConcatIterable from "iterables/concat.js";
import {
  aggregate,
  all,
  any,
  count,
  elementAt,
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
} from "./commands/index.js";
import {
  AppendIterable,
  DistinctIterable,
  ExceptIterable,
  GroupByIterable,
  IntersectIterable,
  OrderByIterable,
  PrependIterable,
  RepeatIterable,
  ReverseIterable,
  SelectIterable,
  SelectManyIterable,
  SkipIterable,
  TakeIterable,
  UnionIterable,
  WhereIterable,
} from "./iterables/index.js";
import type {
  Direction,
  JinqAccumulator,
  JinqGroupBy,
  JinqItemSelect,
  JinqItemSelectMany,
  JinqItemTest,
  JinqKeyMap,
} from "./types.js";

export class JinqIterable<T> implements Iterable<T> {
  private iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  aggregate<TAccumulate>(
    seed: TAccumulate,
    accumulator: JinqAccumulator<T, TAccumulate>,
  ): TAccumulate {
    return aggregate(this.iterable, seed, accumulator);
  }

  all(test: JinqItemTest<T>): boolean {
    return all(this.iterable, test);
  }

  any(test: JinqItemTest<T>): boolean {
    return any(this.iterable, test);
  }

  append(item: T): JinqIterable<T> {
    this.iterable = new AppendIterable(this.iterable, item);
    return this;
  }

  concat(items: Iterable<T>): JinqIterable<T> {
    this.iterable = new ConcatIterable([this.iterable, items]);
    return this;
  }

  contains(item: T): boolean {
    return any(this.iterable, (value: T) => Object.is(value, item));
  }

  count(test?: JinqItemTest<T>): number {
    return count(this.iterable, test);
  }

  distinct(): JinqIterable<T> {
    this.iterable = new DistinctIterable<T>(this.iterable);
    return this;
  }

  elementAt(index: number): T {
    return elementAt(this.iterable, index);
  }

  except(compareTo: Iterable<T>): JinqIterable<T> {
    this.iterable = new ExceptIterable(this.iterable, compareTo);
    return this;
  }

  first(test: JinqItemTest<T>): T {
    return first(this.iterable, test);
  }

  firstOrDefault(test: JinqItemTest<T>, defaultValue: T): T {
    return firstOrDefault(this.iterable, test, defaultValue);
  }

  intersect(compareTo: Iterable<T>): JinqIterable<T> {
    this.iterable = new IntersectIterable(this.iterable, compareTo);
    return this;
  }

  groupBy<TKey>(key: JinqKeyMap<TKey, T>): JinqIterable<JinqGroupBy<TKey, T>> {
    return new JinqIterable<JinqGroupBy<TKey, T>>(
      new GroupByIterable<TKey, T>(this.iterable, key),
    );
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

  orderBy<U>(select: JinqItemSelect<T, U>, direction: Direction = "asc") {
    this.iterable = new OrderByIterable(this.iterable, select, direction);
    return this;
  }

  prepend(item: T): JinqIterable<T> {
    this.iterable = new PrependIterable(this.iterable, item);
    return this;
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

  union(items: Iterable<T>): JinqIterable<T> {
    this.iterable = new UnionIterable([this.iterable, items]);
    return this;
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
