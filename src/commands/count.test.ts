import { describe, it } from "mocha";
import should from "should";
import count from "./count";

describe("commands > count", () => {
  it("should return a count of 0 (zero) for an empty iterable", () => {
    const result = count([], () => true);
    should(result).equal(0);
  });

  it("should return a count of all elements without a specific test", () => {
    const result = count([1, 2, 3, 4, 5, 6, 7, 8]);
    should(result).equal(8);
  });

  it("should return a count of all elements with an undefined test", () => {
    const result = count([1, 2, 3, 4, 5], undefined);
    should(result).equal(5);
  });

  it("should return a count of a number iterable of values which conform to the test", () => {
    const result = count([1, 2, 3], (num) => num < 3);
    should(result).equal(2);
  });

  it("should return a count of a boolean iterable of values which conform to the test", () => {
    const result = count([true, true, false], (bool) => bool);
    should(result).equal(2);
  });

  it("should return a count of a string iterable of values which conform to the test", () => {
    const result = count(
      ["hello", "world", "how", "are", "you"],
      (str) => str.length < 5
    );

    should(result).equal(3);
  });

  it("should return a count of a date iterable of values which conform to the test", () => {
    const result = count(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt > new Date(Date.UTC(2000, 1, 1))
    );

    should(result).equal(2);
  });

  it("should return a count of an object iterable of values which conform to the test", () => {
    const result = count(
      [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
      (obj) => obj.test !== "value1"
    );

    should(result).equal(2);
  });
});
