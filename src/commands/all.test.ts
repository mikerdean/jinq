import { describe, it } from "mocha";
import should from "should";
import all from "./all";

describe("commands > all", () => {
  it("should identify an empty iterable as not conforming to the test", () => {
    const result = all([], () => true);
    should(result).equal(false);
  });

  it("should identify a number iterable with all values conforming to the test", () => {
    const result = all([1, 2, 3], (num) => num < 4);
    should(result).equal(true);
  });

  it("should identify a boolean iterable with all values conforming to the test", () => {
    const result = all([true, true, true], (bool) => bool);
    should(result).equal(true);
  });

  it("should identify a string iterable with all values conforming to the test", () => {
    const result = all(
      ["hello", "world", "how", "are", "you"],
      (str) => str.length <= 5
    );

    should(result).equal(true);
  });

  it("should identify a date iterable with all values conforming to the test", () => {
    const result = all(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt > new Date(Date.UTC(1990, 1, 1))
    );

    should(result).equal(true);
  });

  it("should identify an object iterable with all values conforming to the test", () => {
    const result = all(
      [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
      (obj) => obj.test !== "value0"
    );

    should(result).equal(true);
  });

  it("should identify a number iterable with all values that do __not__ conform to the test", () => {
    const result = all([1, 2, 3], (num) => num < 3);
    should(result).equal(false);
  });

  it("should identify a boolean iterable with all values that do __not__ conform to the test", () => {
    const result = all([true, true, true], (bool) => !bool);
    should(result).equal(false);
  });

  it("should identify a string iterable with all values that do __not__ conform to the test", () => {
    const result = all(
      ["hello", "world", "how", "are", "you"],
      (str) => str.length > 6
    );

    should(result).equal(false);
  });

  it("should identify a date iterable with all values that do __not__ conform to the test", () => {
    const result = all(
      [
        new Date(Date.UTC(1992, 4, 2)),
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
      ],
      (dt) => dt < new Date(Date.UTC(990, 1, 1))
    );

    should(result).equal(false);
  });

  it("should identify an object iterable with all values that do __not__ conform to the test", () => {
    const result = all(
      [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
      (obj) => obj.test !== "value1"
    );

    should(result).equal(false);
  });
});
