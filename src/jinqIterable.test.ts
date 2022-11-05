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

test("should filter using select", (ava) => {
  const input = [
    { value: 1, text: "Value #1" },
    { value: 2, text: "Value #2" },
    { value: 3, text: "Value #3" },
    { value: 4, text: "Value #4" },
    { value: 5, text: "Value #5" },
  ];

  const query = new JinqIterable(input).select((x) => x.value);

  const result = [...query];
  ava.deepEqual(result, [1, 2, 3, 4, 5]);
});

test("should filter using select twice", (ava) => {
  const input = [
    { value: 1, text: "Value #1", active: true },
    { value: 2, text: "Value #2", active: true },
    { value: 3, text: "Value #3", active: false },
    { value: 4, text: "Value #4", active: true },
    { value: 5, text: "Value #5", active: false },
  ];

  const query = new JinqIterable(input)
    .select(({ value, active }) => ({ value, active }))
    .select((x) => x.active);

  const result = [...query];
  ava.deepEqual(result, [true, true, false, true, false]);
});

test("should filter using selectMany", (ava) => {
  const input = [
    { id: 1, title: "Blog Post #1", tags: ["test", "flag", "nightmare"] },
    { id: 2, title: "Blog Post #2", tags: ["fire", "dog", "walking"] },
    { id: 3, title: "Blog Post #3", tags: ["derp", "engine", "cat"] },
  ];

  const query = new JinqIterable(input).selectMany((x) => x.tags);

  const result = [...query];
  ava.deepEqual(result, [
    "test",
    "flag",
    "nightmare",
    "fire",
    "dog",
    "walking",
    "derp",
    "engine",
    "cat",
  ]);
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

test("should filter using a combination of iterators (where, skip and select)", (ava) => {
  const input = [
    { value: 1, text: "Value #1", active: true },
    { value: 2, text: "Value #2", active: true },
    { value: 3, text: "Value #3", active: false },
    { value: 4, text: "Value #4", active: true },
    { value: 5, text: "Value #5", active: false },
  ];

  const query = new JinqIterable(input)
    .where((x) => x.active)
    .skip(1)
    .select((x) => x.value);

  const result = [...query];
  ava.deepEqual(result, [2, 4]);
});
