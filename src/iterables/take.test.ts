import test from "ava";
import TakeIterable from "./take";

test("should correctly take an iterable", (ava) => {
  const query = new TakeIterable([1, 2, 3, 4, 5], 3);
  const result = [...query];

  ava.deepEqual(result, [1, 2, 3]);
});

test("should correctly take an iterable when actioned twice", (ava) => {
  const query = new TakeIterable([1, 2, 3, 4, 5], 3);
  const query2 = new TakeIterable(query, 1);

  const result = [...query];
  const result2 = [...query2];

  ava.not(query, query2);
  ava.deepEqual(result, [1, 2, 3]);
  ava.deepEqual(result2, [1]);
});
