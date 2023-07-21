import { describe, it } from "mocha";
import should from "should";
import ConcatIterable from "./concat.js";

describe("iterables > distinct", () => {
  it("should append two iterables together successfully", () => {
    const query = new ConcatIterable([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ]);
    const result = [...query];
    should(result).deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should append three iterables together successfully", () => {
    const query = new ConcatIterable([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
    ]);
    const result = [...query];
    should(result).deepEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
  });
});
