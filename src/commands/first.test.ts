import { describe, it } from "mocha";
import should from "should";
import first from "./first";

describe("commands > first", () => {
  it("should throw an error for an empty iterable", () => {
    should.throws(
      () => first([], () => true),
      Error,
      "item could not be found in iterable"
    );
  });

  it("should throw an error when it cannot find an applicable item in the iterable", () => {
    should.throws(
      () => first([true], () => false),
      Error,
      "item could not be found in iterable"
    );
  });

  it("should return the first value of a number iterable which conforms to the test", () => {
    const result = first([1, 2, 3], (num) => num < 3);
    should(result).equal(1);
  });

  it("should return the first value of a boolean iterable which conforms to the test", () => {
    const result = first([true, true, false], (bool) => bool);
    should(result).equal(true);
  });

  it("should return the first value of a string iterable which conforms to the test", () => {
    const result = first(
      ["hello", "world", "how", "are", "you"],
      (str) => str.length < 5
    );

    should(result).equal("how");
  });

  it("should return the first value of a date iterable which conforms to the test", () => {
    const result = first(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt > new Date(Date.UTC(2000, 1, 1))
    );

    should(result.toISOString()).equal("2001-06-23T00:00:00.000Z");
  });

  it("should return a the first value of an object iterable of values which conform to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };

    const result = first([obj1, obj2, obj3], (obj) => obj.test === "value2");
    should(result).equal(obj2);
  });
});
