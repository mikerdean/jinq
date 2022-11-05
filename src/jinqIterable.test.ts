import test from "ava";
import JinqIterable from "./jinqIterable";

test("should filter using where", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).where((n) => n > 2);

  const result = [...query];
  ava.deepEqual(result, [3, 4, 5]);
});

test("should filter using where twice", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5])
    .where((n) => n > 2)
    .where((n) => n > 4);

  const result = [...query];
  ava.deepEqual(result, [5]);
});

test("should filter using reverse", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).reverse();

  const result = [...query];
  ava.deepEqual(result, [5, 4, 3, 2, 1]);
});

test("should filter using reverse twice", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).reverse().reverse();

  const result = [...query];
  ava.deepEqual(result, [1, 2, 3, 4, 5]);
});

test("should filter using skip", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).skip(3);

  const result = [...query];
  ava.deepEqual(result, [4, 5]);
});

test("should filter using skip twice", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).skip(1).skip(3);

  const result = [...query];
  ava.deepEqual(result, [5]);
});

test("should filter using take", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).take(3);

  const result = [...query];
  ava.deepEqual(result, [1, 2, 3]);
});

test("should filter using skip take", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).take(3).take(1);

  const result = [...query];
  ava.deepEqual(result, [1]);
});

test("should filter using a combination of iterators (where and reverse)", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).where((n) => n > 2).reverse();

  const result = [...query];
  ava.deepEqual(result, [5, 4, 3]);
});

test("should filter using a combination of iterators (skip and take)", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).skip(3).take(1);

  const result = [...query];
  ava.deepEqual(result, [4]);
});

test("should filter using a combination of iterators (where, skip and take)", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5])
    .where((n) => n > 1)
    .skip(3)
    .take(1);

  const result = [...query];
  ava.deepEqual(result, [5]);
});
