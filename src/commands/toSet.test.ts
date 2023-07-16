import { describe, it } from "mocha";
import should from "should";
import toSet from "./toSet.js";

describe("commands > toSet", () => {
  it("should convert a set to a new set of the appropriate type", () => {
    const set = new Set(["test1", "test1", "test2", "test2"]);
    const result = toSet(set);
    should(result).instanceOf(Set);
    should(result).deepEqual(new Set(["test1", "test2"]));
  });

  it("should convert an array of the to a set of appropriate type", () => {
    const arr = [1, 2, 2, 2, 3, 3];
    const result = toSet(arr);
    should(result).instanceOf(Set);
    should(result).deepEqual(new Set([1, 2, 3]));
  });

  it("should convert an iterable object to a set of the appropriate type", () => {
    const obj = {
      *[Symbol.iterator]() {
        yield "test";
        yield "dork";
        yield "dork";
        yield "donkey";
        yield "brains";
      },
    };

    const result = toSet(obj);
    should(result).instanceOf(Set);
    should(result).deepEqual(new Set(["test", "dork", "donkey", "brains"]));
  });

  it("should convert a map to a set of the appropriate type", () => {
    const map = new Map<string, number>();
    map.set("one", 1);
    map.set("two", 2);
    map.set("three", 3);

    const result = toSet(map);
    should(result).instanceOf(Set);
    should([...result]).deepEqual([
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ]);
  });
});
