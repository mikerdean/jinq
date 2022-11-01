import test from "ava";
import toSet from "./toSet";

test("should convert a set to a new set of the appropriate type", (ava) => {
  const set = new Set(["test1", "test1", "test2", "test2"]);
  const result = toSet(set);
  ava.is(result instanceof Set, true, "isSet");
  ava.not(result, set);
  ava.deepEqual(result, new Set(["test1", "test2"]));
});

test("should convert an array of the to a set of appropriate type", (ava) => {
  const arr = [1, 2, 2, 2, 3, 3];

  const result = toSet(arr);
  ava.is(result instanceof Set, true, "isSet");
  ava.not(result, arr);
  ava.deepEqual(result, new Set([1, 2, 3]));
});

test("should convert an iterable object to a set of the appropriate type", (ava) => {
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
  ava.is(result instanceof Set, true, "isSet");
  ava.not(result, obj);
  ava.deepEqual(result, new Set(["test", "dork", "donkey", "brains"]));
});

test("should convert a map to a set of the appropriate type", (ava) => {
  const map = new Map<string, number>();
  map.set("one", 1);
  map.set("two", 2);
  map.set("three", 3);

  const result = toSet(map);
  ava.is(result instanceof Set, true, "isSet");
  ava.not(result, map);
  ava.deepEqual(
    result,
    new Set([
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ])
  );
});
