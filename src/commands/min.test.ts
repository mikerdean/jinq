import { describe, it } from "mocha";
import should from "should";
import min from "./min.js";

describe("commands > min", () => {
  it("should throw for an iterable with no elements", () => {
    should.throws(
      () => min([]),
      Error,
      "no values were found in this iterable"
    );
  });

  it("should return the min value of a number iterable which conforms to the test", () => {
    const result = min([1, 5, 3, 2]);
    should(result).equal(1);
  });

  it("should return the max value of a boolean iterable which conforms to the test", () => {
    const result = min([true, true, false]);
    should(result).equal(false);
  });

  it("should return the max value of a string iterable which conforms to the test", () => {
    const result = min(["hello", "world", "how", "zebra", "are", "you"]);
    should(result).equal("are");
  });

  it("should return the max value of a date iterable which conforms to the test", () => {
    const result = min([
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ]);

    should(result.toISOString()).equal("1992-05-02T00:00:00.000Z");
  });
});
