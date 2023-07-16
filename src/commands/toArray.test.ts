import { describe, it } from "mocha";
import should from "should";
import toArray from "./toArray.js";

describe("commands > toArray", () => {
  it("should create a new array from an array of the appropriate type", () => {
    const arr = [1, 2, 3, null];

    const result = toArray(arr);
    should(result).be.an.Array();
    should(result).deepEqual([1, 2, 3, null]);
  });

  it("should convert an iterable object to an array of the appropriate type", () => {
    const obj = {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };

    const result = toArray(obj);
    should(result).be.an.Array();
    should(result).deepEqual([1, 2, 3]);
  });

  it("should convert a set to an array of the appropriate type", () => {
    const set = new Set(["test1", "test1", "test2", "test2"]);
    const result = toArray(set);
    should(result).be.an.Array();
    should(result).deepEqual(["test1", "test2"]);
  });

  it("should convert a map to an array of the appropriate type", () => {
    const map = new Map<string, number>();
    map.set("one", 1);
    map.set("two", 2);
    map.set("three", 3);

    const result = toArray(map);
    should(result).be.an.Array();
    should(result).deepEqual([
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ]);
  });
});
