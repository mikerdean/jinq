import test from "ava";
import SkipIterable from "./skip";

test("should correctly skip an iterable", (ava) => {
  const query = new SkipIterable([1, 2, 3, 4, 5], 3);
  const result = [...query];

  ava.deepEqual(result, [4, 5]);
});

test("should correctly skip an iterable when actioned twice", (ava) => {
  const query = new SkipIterable([1, 2, 3, 4, 5], 3);
  const query2 = new SkipIterable(query, 1);

  const result = [...query];
  const result2 = [...query2];

  ava.not(query, query2);
  ava.deepEqual(result, [4, 5]);
  ava.deepEqual(result2, [5]);
});
