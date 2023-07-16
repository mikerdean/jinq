import { describe, it } from "mocha";
import should from "should";
import WhereIterable from "./where.js";

describe("iterables > where", () => {
  it("should correctly filter a iterable", () => {
    const query = new WhereIterable([1, 2, 3, 4, 5], (n) => n > 3);
    const result = [...query];
    should.deepEqual(result, [4, 5]);
  });

  it("should correctly filter a iterable when filtered twice", () => {
    const query = new WhereIterable([1, 2, 3, 4, 5], (n) => n > 3);
    const query2 = new WhereIterable(query, (n) => n > 4);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [4, 5]);
    should.deepEqual(result2, [5]);
  });
});
