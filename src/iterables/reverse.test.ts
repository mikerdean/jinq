import { describe, it } from "mocha";
import should from "should";
import ReverseIterable from "./reverse.js";

describe("iterables > reverse", () => {
  it("should correctly reverse an iterable", () => {
    const query = new ReverseIterable([1, 2, 3, 4, 5]);
    const result = [...query];
    should.deepEqual(result, [5, 4, 3, 2, 1]);
  });

  it("should correctly reverse an iterable twice", () => {
    const query = new ReverseIterable([1, 2, 3, 4, 5]);
    const query2 = new ReverseIterable(query);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [5, 4, 3, 2, 1]);
    should.deepEqual(result2, [1, 2, 3, 4, 5]);
  });
});
