import { describe, it } from "mocha";
import should from "should";
import PrependIterable from "./prepend.js";

describe("iterables > prepend", () => {
  it("should append an element on the end of an iterable", () => {
    const query = new PrependIterable([1, 2, 3, 4, 5], 37);
    const result = [...query];
    should(result).deepEqual([37, 1, 2, 3, 4, 5]);
  });
});
