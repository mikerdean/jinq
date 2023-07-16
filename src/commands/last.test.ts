import { describe, it } from "mocha";
import should from "should";
import last from "./last.js";

describe("commands > last", () => {
  it("should throw an error for an empty iterable", () => {
    should.throws(
      () => last([], () => true),
      Error,
      "item could not be found in iterable",
    );
  });

  it("should throw an error when it cannot find an applicable item in the iterable", () => {
    should.throws(
      () => last([true], () => false),
      Error,
      "item could not be found in iterable",
    );
  });

  it("should return the last value of a number iterable which conforms to the test", () => {
    const result = last([1, 2, 3], (num) => num < 3);
    should(result).equal(2);
  });

  it("should return the last value of a boolean iterable which conforms to the test", () => {
    const result = last([true, true, false], (bool) => !bool);
    should(result).equal(false);
  });

  it("should return the last value of a string iterable which conforms to the test", () => {
    const result = last(
      ["hello", "world", "how", "are", "you"],
      (str) => str.length < 5,
    );

    should(result).equal("you");
  });

  it("should return the last value of a date iterable which conforms to the test", () => {
    const result = last(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt > new Date(Date.UTC(2000, 1, 1)),
    );

    should(result.toISOString()).equal("2022-10-15T00:00:00.000Z");
  });

  it("should return a the last value of an object iterable of values which conform to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value2" };

    const result = last(
      [obj1, obj2, obj3, obj4],
      (obj) => obj.test === "value2",
    );

    should(result).equal(obj4);
  });
});
