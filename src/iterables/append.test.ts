import { describe, it } from "mocha";
import should from "should";
import AppendIterable from "./append.js";

describe("iterables > append", () => {
  it("should append an element on the end of an iterable", () => {
    const query = new AppendIterable([1, 2, 3, 4, 5], 37);
    const result = [...query];
    should(result).deepEqual([1, 2, 3, 4, 5, 37]);
  });
});
