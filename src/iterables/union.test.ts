import { describe, it } from "mocha";
import should from "should";
import UnionIterable from "./union.js";

describe("iterables > concat", () => {
  it("should union two iterables together successfully", () => {
    const query = new UnionIterable([
      [1, 2, 3, 4, 5],
      [1, 2, 4, 6, 12],
    ]);
    const result = [...query];
    should(result).deepEqual([1, 2, 3, 4, 5, 6, 12]);
  });

  it("should union three iterables together successfully", () => {
    const query = new UnionIterable([
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 10],
    ]);
    const result = [...query];
    should(result).deepEqual([1, 2, 3, 4, 5, 10]);
  });
});
