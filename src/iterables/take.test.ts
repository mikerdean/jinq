import { describe, it } from "mocha";
import should from "should";
import TakeIterable from "./take.js";

describe("iterables > take", () => {
  it("should correctly take an iterable", () => {
    const query = new TakeIterable([1, 2, 3, 4, 5], 3);
    const result = [...query];
    should.deepEqual(result, [1, 2, 3]);
  });

  it("should correctly take an iterable when actioned twice", () => {
    const query = new TakeIterable([1, 2, 3, 4, 5], 3);
    const query2 = new TakeIterable(query, 1);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [1, 2, 3]);
    should.deepEqual(result2, [1]);
  });
});
