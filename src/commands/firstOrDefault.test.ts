import { describe, it } from "mocha";
import should from "should";
import firstOrDefault from "./firstOrDefault";

describe("commands > firstOrDefault", () => {
  it("should return the defaultValue for an empty iterable", () => {
    const result = firstOrDefault<number>([], (num) => num > 1, 25);
    should(result).equal(25);
  });

  it("should return the first value of a number iterable which conforms to the test", () => {
    const result = firstOrDefault([1, 2, 3], (num) => num < 3, 5);
    should(result).equal(1);
  });

  it("should return the defaultValue when it cannot find an applicable item in a number iterable", () => {
    const result = firstOrDefault([1, 2, 3], (num) => num > 4, 0);
    should(result).equal(0);
  });

  it("should return the first value of a boolean iterable which conforms to the test", () => {
    const result = firstOrDefault([false, true, false], (bool) => bool, false);
    should(result).equal(true);
  });

  it("should return the defaultValue when it cannot find an applicable item in a boolean iterable", () => {
    const result = firstOrDefault([true, true, true], (bool) => !bool, false);
    should(result).equal(false);
  });

  it("should return the first value of a string iterable which conforms to the test", () => {
    const result = firstOrDefault(
      ["hello", "world", "dork"],
      (str) => str.length < 5,
      "something"
    );

    should(result).equal("dork");
  });

  it("should return the defaultValue when it cannot find an applicable item in a string iterable", () => {
    const result = firstOrDefault(
      ["hello", "world", "dork"],
      (str) => str.length > 6,
      "a cool result"
    );

    should(result).equal("a cool result");
  });

  it("should return the first value of a date iterable which conforms to the test", () => {
    const result = firstOrDefault(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt > new Date(Date.UTC(2000, 1, 1)),
      new Date(Date.UTC(1900, 0, 1))
    );

    should(result.toISOString()).equal("2001-06-23T00:00:00.000Z");
  });

  it("should return the defaultValue when it cannot find an applicable item in a date iterable", () => {
    const result = firstOrDefault(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt < new Date(Date.UTC(1990, 0, 1)),
      new Date(Date.UTC(1900, 0, 1))
    );

    should(result.toISOString()).equal("1900-01-01T00:00:00.000Z");
  });

  it("should return the first value of an object iterable which conforms to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value4" };

    const result = firstOrDefault(
      [obj1, obj2, obj3],
      (obj) => obj.test === "value2",
      obj4
    );

    should(result).equal(obj2);
  });

  it("should return the defaultValue when it cannot find an applicable item in an object iterable", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value4" };

    const result = firstOrDefault(
      [obj1, obj2, obj3],
      (obj) => obj.test === "value0",
      obj4
    );

    should(result).equal(obj4);
  });
});
