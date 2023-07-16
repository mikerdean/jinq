import { describe, it } from "mocha";
import should from "should";
import single, { SingleValueError } from "./single.js";

describe("commands > single", () => {
  it("should throw an error for an empty iterable", () => {
    should.throws(
      () => single([], () => true),
      Error,
      "item could not be found in iterable",
    );
  });

  it("should throw an error when it cannot find an applicable item in the iterable", () => {
    should.throws(
      () => single([true], () => false),
      Error,
      "item could not be found in iterable",
    );
  });

  it("should throw an error when more than one applicable item in the iterable", () => {
    should.throws(
      () => single([true, true], () => true),
      SingleValueError,
      "more than one item was found in this iterable matching your test",
    );
  });

  it("should return a single value of a number iterable which conforms to the test", () => {
    const result = single([1, 2, 3], (num) => num > 2);
    should(result).equal(3);
  });

  it("should return a single value of a boolean iterable which conforms to the test", () => {
    const result = single([true, true, false], (bool) => !bool);
    should(result).equal(false);
  });

  it("should return a single value of a string iterable which conforms to the test", () => {
    const result = single(
      ["hello", "world", "how", "are", "you"],
      (str) => str === "are",
    );

    should(result).equal("are");
  });

  it("should return a single value of a date iterable which conforms to the test", () => {
    const result = single(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt.toISOString() === "2022-10-15T00:00:00.000Z",
    );

    should(result.toISOString()).equal("2022-10-15T00:00:00.000Z");
  });

  it("should a single value of an object iterable which conforms to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };

    const result = single([obj1, obj2, obj3], (obj) => obj.test === "value2");
    should(result).equal(obj2);
  });
});
