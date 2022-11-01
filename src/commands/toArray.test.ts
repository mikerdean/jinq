import test from "ava";
import toArray from "./toArray";

test("should create a new array from an array of the appropriate type", (ava) => {
  const arr = [1, 2, 3, null];

  const result = toArray(arr);
  ava.is(Array.isArray(result), true, "isArray");
  ava.not(result, arr);
  ava.deepEqual(result, [1, 2, 3, null]);
});

test("should convert an iterable object to an array of the appropriate type", (ava) => {
  const obj = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  const result = toArray(obj);
  ava.is(Array.isArray(result), true, "isArray");
  ava.not(result, obj);
  ava.deepEqual(result, [1, 2, 3]);
});

test("should convert a set to an array of the appropriate type", (ava) => {
  const set = new Set(["test1", "test1", "test2", "test2"]);
  const result = toArray(set);
  ava.is(Array.isArray(result), true, "isArray");
  ava.not(result, set);
  ava.deepEqual(result, ["test1", "test2"]);
});

test("should convert a map to an array of the appropriate type", (ava) => {
  const map = new Map<string, number>();
  map.set("one", 1);
  map.set("two", 2);
  map.set("three", 3);

  const result = toArray(map);
  ava.is(Array.isArray(result), true, "isArray");
  ava.not(result, map);
  ava.deepEqual(result, [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ]);
});
