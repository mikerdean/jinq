import { describe, it } from "mocha";
import should from "should";
import { SingleValueError } from "./single.js";
import singleOrDefault from "./singleOrDefault.js";

describe("commands > singleOrDefault", () => {
  it("should throw an error when more than one applicable item in the iterable", () => {
    should.throws(
      () => singleOrDefault([true, true], () => true, false),
      SingleValueError,
      "more than one item was found in this iterable matching your test"
    );
  });

  it("should return the defaultValue for an empty iterable", () => {
    const result = singleOrDefault([], (num) => num > 1, 55);
    should(result).equal(55);
  });

  it("should return the defaultValue for an iterable when it cannot find an item", () => {
    const result = singleOrDefault([1, 2, 3, 4, 5], (num) => num > 15, 89);
    should(result).equal(89);
  });

  it("should return a single value of a number iterable which conforms to the test", () => {
    const result = singleOrDefault([1, 2, 3], (num) => num > 2, 34);
    should(result).equal(3);
  });

  it("should return a single value of a boolean iterable which conforms to the test", () => {
    const result = singleOrDefault([true, true, false], (bool) => !bool, true);
    should(result).equal(false);
  });

  it("should return a single value of a string iterable which conforms to the test", () => {
    const result = singleOrDefault(
      ["hello", "world", "how", "are", "you"],
      (str) => str === "are",
      "doughnut"
    );

    should(result).equal("are");
  });

  it("should return a single value of a date iterable which conforms to the test", () => {
    const result = singleOrDefault(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt.toISOString() === "2022-10-15T00:00:00.000Z",
      new Date(Date.UTC(1900, 0, 1))
    );

    should(result.toISOString()).equal("2022-10-15T00:00:00.000Z");
  });

  it("should a single value of an object iterable which conforms to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value4" };

    const result = singleOrDefault(
      [obj1, obj2, obj3],
      (obj) => obj.test === "value2",
      obj4
    );

    should(result).equal(obj2);
  });
});
