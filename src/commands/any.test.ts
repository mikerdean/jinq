import test from "ava";
import any from "./any";

test("should identify an empty iterable as not conforming to the test", (ava) => {
  const result = any([], () => true);
  ava.is(result, false);
});

test("should identify a number iterable with at least one value conforming to the test", (ava) => {
  const result = any([1, 2, 3], (num) => num === 2);
  ava.is(result, true);
});

test("should identify a boolean iterable with at least one value conforming to the test", (ava) => {
  const result = any([true, true, true], (bool) => bool);
  ava.is(result, true);
});

test("should identify a string iterable with at least one value conforming to the test", (ava) => {
  const result = any(
    ["hello", "world", "how", "are", "you"],
    (str) => str === "how"
  );
  ava.is(result, true);
});

test("should identify a date iterable with at least one value conforming to the test", (ava) => {
  const result = any(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt > new Date(Date.UTC(2022, 1, 1))
  );
  ava.is(result, true);
});

test("should identify an object iterable with at least one value conforming to the test", (ava) => {
  const result = any(
    [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
    (obj) => obj.test === "value3"
  );

  ava.is(result, true);
});

test("should identify a number iterable with no values that conform to the test", (ava) => {
  const result = any([1, 2, 3], (num) => num > 3);
  ava.is(result, false);
});

test("should identify a boolean iterable with no values that conform to the test", (ava) => {
  const result = any([true, true, true], (bool) => !bool);
  ava.is(result, false);
});

test("should identify a string iterable with no values that conform to the test", (ava) => {
  const result = any(
    ["hello", "world", "how", "are", "you"],
    (str) => str.length > 6
  );
  ava.is(result, false);
});

test("should identify a date iterable with no values that conform to the test", (ava) => {
  const result = any(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt < new Date(Date.UTC(1990, 1, 1))
  );
  ava.is(result, false);
});

test("should identify an object iterable with no values that conform to the test", (ava) => {
  const result = any(
    [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
    (obj) => obj.test === "value0"
  );
  ava.is(result, false);
});
