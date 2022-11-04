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

test("should filter using a combination of iterators (where and reverse)", (ava) => {
  const query = new JinqIterable([1, 2, 3, 4, 5]).where((n) => n > 2).reverse();

  const result = [...query];
  ava.deepEqual(result, [5, 4, 3]);
});
