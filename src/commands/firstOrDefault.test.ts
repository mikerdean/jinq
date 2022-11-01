import test from "ava";
import firstOrDefault from "./firstOrDefault";

test("should return the defaultValue for an empty iterable", (ava) => {
  const result = firstOrDefault<number>([], (num) => num > 1, 25);
  ava.is(result, 25);
});

test("should return the first value of a number iterable which conforms to the test", (ava) => {
  const result = firstOrDefault([1, 2, 3], (num) => num < 3, 5);
  ava.is(result, 1);
});

test("should return the defaultValue when it cannot find an applicable item in a number iterable", (ava) => {
  const result = firstOrDefault([1, 2, 3], (num) => num > 4, 0);
  ava.is(result, 0);
});

test("should return the first value of a boolean iterable which conforms to the test", (ava) => {
  const result = firstOrDefault([false, true, false], (bool) => bool, false);
  ava.is(result, true);
});

test("should return the defaultValue when it cannot find an applicable item in a boolean iterable", (ava) => {
  const result = firstOrDefault([true, true, true], (bool) => !bool, false);
  ava.is(result, false);
});

test("should return the first value of a string iterable which conforms to the test", (ava) => {
  const result = firstOrDefault(
    ["hello", "world", "dork"],
    (str) => str.length < 5,
    "something"
  );
  ava.is(result, "dork");
});

test("should return the defaultValue when it cannot find an applicable item in a string iterable", (ava) => {
  const result = firstOrDefault(
    ["hello", "world", "dork"],
    (str) => str.length > 6,
    "a cool result"
  );
  ava.is(result, "a cool result");
});

test("should return the first value of a date iterable which conforms to the test", (ava) => {
  const result = firstOrDefault(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt > new Date(Date.UTC(2000, 1, 1)),
    new Date(Date.UTC(1900, 0, 1))
  );
  ava.is(result.toISOString(), "2001-06-23T00:00:00.000Z");
});

test("should return the defaultValue when it cannot find an applicable item in a date iterable", (ava) => {
  const result = firstOrDefault(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt < new Date(Date.UTC(1990, 0, 1)),
    new Date(Date.UTC(1900, 0, 1))
  );
  ava.is(result.toISOString(), "1900-01-01T00:00:00.000Z");
});

test("should return the first value of an object iterable which conforms to the test", (ava) => {
  const obj1 = { test: "value1" };
  const obj2 = { test: "value2" };
  const obj3 = { test: "value3" };
  const obj4 = { test: "value4" };

  const result = firstOrDefault(
    [obj1, obj2, obj3],
    (obj) => obj.test === "value2",
    obj4
  );
  ava.is(result, obj2);
});

test("should return the defaultValue when it cannot find an applicable item in an object iterable", (ava) => {
  const obj1 = { test: "value1" };
  const obj2 = { test: "value2" };
  const obj3 = { test: "value3" };
  const obj4 = { test: "value4" };

  const result = firstOrDefault(
    [obj1, obj2, obj3],
    (obj) => obj.test === "value0",
    obj4
  );
  ava.is(result, obj4);
});
