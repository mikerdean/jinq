import { describe, it } from "mocha";
import should from "should";
import lastOrDefault from "./lastOrDefault.js";

describe("commands > lastOrDefault", () => {
  it("should return the defaultValue for an empty iterable", () => {
    const result = lastOrDefault<number>([], 25);
    should(result).equal(25);
  });

  it("should return the defaultValue for an empty iterable with the supplied test", () => {
    const result = lastOrDefault<number>([], 25, (num) => num > 1);
    should(result).equal(25);
  });

  it("should return the last value of a number iterable which conforms to the test", () => {
    const result = lastOrDefault([1, 2, 3], 5, (num) => num < 3);
    should(result).equal(2);
  });

  it("should return the defaultValue when it cannot find an applicable item in a number iterable", () => {
    const result = lastOrDefault([1, 2, 3], 0, (num) => num > 4);
    should(result).equal(0);
  });

  it("should return the last value of a boolean iterable which conforms to the test", () => {
    const result = lastOrDefault([false, true, false], false, (bool) => bool);
    should(result).equal(true);
  });

  it("should return the defaultValue when it cannot find an applicable item in a boolean iterable", () => {
    const result = lastOrDefault([true, true, true], false, (bool) => !bool);
    should(result).equal(false);
  });

  it("should return the last value of a string iterable which conforms to the test", () => {
    const result = lastOrDefault(
      ["hello", "world", "dork", "mucus"],
      "something",
      (str) => str.length < 5,
    );

    should(result).equal("dork");
  });

  it("should return the defaultValue when it cannot find an applicable item in a string iterable", () => {
    const result = lastOrDefault(
      ["hello", "world", "dork"],
      "a cool result",
      (str) => str.length > 6,
    );

    should(result).equal("a cool result");
  });

  it("should return the last value of a date iterable which conforms to the test", () => {
    const result = lastOrDefault(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      new Date(Date.UTC(1900, 0, 1)),
      (dt) => dt > new Date(Date.UTC(2000, 1, 1)),
    );

    should(result.toISOString()).equal("2022-10-15T00:00:00.000Z");
  });

  it("should return the defaultValue when it cannot find an applicable item in a date iterable", () => {
    const result = lastOrDefault(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      new Date(Date.UTC(1900, 0, 1)),
      (dt) => dt < new Date(Date.UTC(1990, 0, 1)),
    );

    should(result.toISOString()).equal("1900-01-01T00:00:00.000Z");
  });

  it("should return the last value of an object iterable which conforms to the test", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value4" };

    const result = lastOrDefault(
      [obj1, obj2, obj3],
      obj4,
      (obj) => obj.test === "value2",
    );

    should(result).equal(obj2);
  });

  it("should return the defaultValue when it cannot find an applicable item in an object iterable", () => {
    const obj1 = { test: "value1" };
    const obj2 = { test: "value2" };
    const obj3 = { test: "value3" };
    const obj4 = { test: "value4" };

    const result = lastOrDefault(
      [obj1, obj2, obj3],
      obj4,
      (obj) => obj.test === "value0",
    );

    should(result).equal(obj4);
  });
});
