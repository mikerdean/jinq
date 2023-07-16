import { describe, it } from "mocha";
import aggregate from "./aggregate.js";
import should from "should";

describe("commands > aggregate", () => {
  it("should output the seed value if the iterable is empty", () => {
    const result = aggregate([], 0, (prev, current) => prev + current);
    should(result).equal(0);
  });

  it("should correctly aggregate number output", () => {
    const result = aggregate(
      [1, 5, 8, 2],
      15,
      (prev, current) => prev + current,
    );
    should(result).equal(31);
  });

  it("should correctly aggregate to a different output type", () => {
    const result = aggregate(
      [1, 5, 8, 2],
      "",
      (prev, current) => prev + current,
    );

    should(result).equal("1582");
  });

  it("should correctly aggregate string output", () => {
    const result = aggregate(
      ["what", "the", "hell", "is", "this?"],
      "",
      (prev, current) => `${prev} ${current}`,
    );
    should(result).equal(" what the hell is this?");
  });

  it("should correctly aggregate objects", () => {
    const result = aggregate(
      [{ key1: 1 }, { key2: 2 }, { key5: 3 }],
      {},
      (prev, current) => ({ ...prev, ...current }),
    );

    should(result).deepEqual({
      key1: 1,
      key2: 2,
      key5: 3,
    });
  });
});
