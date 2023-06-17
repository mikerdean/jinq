import { describe, it } from "mocha";
import should from "should";
import RepeatIterable from "./repeat";

describe("iterables > repeat", () => {
  it("should correctly repeat an iterable", () => {
    const query = new RepeatIterable([1, 2, 3, 4, 5], 2);
    const result = [...query];
    should.deepEqual(result, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
  });

  it("should correctly repeat an iterable twice", () => {
    const query = new RepeatIterable([1, 2, 3], 2);
    const query2 = new RepeatIterable(query, 2);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [1, 2, 3, 1, 2, 3]);
    should.deepEqual(result2, [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]);
  });
});
