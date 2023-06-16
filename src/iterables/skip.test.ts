import { describe, it } from "mocha";
import should from "should";
import SkipIterable from "./skip";

describe("iterables > skip", () => {
  it("should correctly skip an iterable", () => {
    const query = new SkipIterable([1, 2, 3, 4, 5], 3);
    const result = [...query];
    should.deepEqual(result, [4, 5]);
  });

  it("should correctly skip an iterable when actioned twice", () => {
    const query = new SkipIterable([1, 2, 3, 4, 5], 3);
    const query2 = new SkipIterable(query, 1);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [4, 5]);
    should.deepEqual(result2, [5]);
  });
});
