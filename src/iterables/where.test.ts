import test from "ava";
import WhereIterable from "./where";

test("should correctly filter a iterable", (ava) => {
  const query = new WhereIterable([1, 2, 3, 4, 5], (n) => n > 3);
  const result = [...query];

  ava.deepEqual(result, [4, 5]);
});

test("should correctly filter a iterable when filtered twice", (ava) => {
  const query = new WhereIterable([1, 2, 3, 4, 5], (n) => n > 3);
  const query2 = query.where((n) => n > 4);

  const result = [...query];
  const result2 = [...query2];

  ava.not(query, query2);
  ava.deepEqual(result, [4, 5]);
  ava.deepEqual(result2, [5]);
});
