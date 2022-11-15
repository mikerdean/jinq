import test from "ava";
import count from "./count";

test("should return a count of 0 (zero) for an empty iterable", (ava) => {
  const result = count([], () => true);
  ava.is(result, 0);
});

test("should return a count of all elements without a specific test", (ava) => {
  const result = count([1, 2, 3, 4, 5, 6, 7, 8]);
  ava.is(result, 8);
});

test("should return a count of all elements with an undefined test", (ava) => {
  const result = count([1, 2, 3, 4, 5], undefined);
  ava.is(result, 5);
});

test("should return a count of a number iterable of values which conform to the test", (ava) => {
  const result = count([1, 2, 3], (num) => num < 3);
  ava.is(result, 2);
});

test("should return a count of a boolean iterable of values which conform to the test", (ava) => {
  const result = count([true, true, false], (bool) => bool);
  ava.is(result, 2);
});

test("should return a count of a string iterable of values which conform to the test", (ava) => {
  const result = count(
    ["hello", "world", "how", "are", "you"],
    (str) => str.length < 5
  );
  ava.is(result, 3);
});

test("should return a count of a date iterable of values which conform to the test", (ava) => {
  const result = count(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt > new Date(Date.UTC(2000, 1, 1))
  );
  ava.is(result, 2);
});

test("should return a count of an object iterable of values which conform to the test", (ava) => {
  const result = count(
    [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
    (obj) => obj.test !== "value1"
  );

  ava.is(result, 2);
});
