import { describe, it } from "mocha";
import should from "should";
import max from "./max.js";

describe("commands > max", () => {
  it("should throw for an iterable with no elements", () => {
    should.throws(
      () => max([]),
      Error,
      "no values were found in this iterable",
    );
  });

  it("should return the max value of a number iterable which conforms to the test", () => {
    const result = max([1, 5, 3, 2]);
    should(result).equal(5);
  });

  it("should return the max value of a boolean iterable which conforms to the test", () => {
    const result = max([true, true, false]);
    should(result).equal(true);
  });

  it("should return the max value of a string iterable which conforms to the test", () => {
    const result = max(["hello", "world", "how", "zebra", "are", "you"]);
    should(result).equal("zebra");
  });

  it("should return the max value of a date iterable which conforms to the test", () => {
    const result = max([
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ]);

    should(result.toISOString()).equal("2022-10-15T00:00:00.000Z");
  });
});
