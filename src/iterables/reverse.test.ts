import test from "ava";
import ReverseIterable from "./reverse";

test("should correctly reverse an iterable", (ava) => {
  const query = new ReverseIterable([1, 2, 3, 4, 5]);
  const result = [...query];

  ava.deepEqual(result, [5, 4, 3, 2, 1]);
});

test("should correctly reverse an iterable twice", (ava) => {
  const query = new ReverseIterable([1, 2, 3, 4, 5]);
  const query2 = new ReverseIterable(query);

  const result = [...query];
  const result2 = [...query2];

  ava.not(query, query2);
  ava.deepEqual(result, [5, 4, 3, 2, 1]);
  ava.deepEqual(result2, [1, 2, 3, 4, 5]);
});
