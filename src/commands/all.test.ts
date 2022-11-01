import test from "ava";
import all from "./all";

test("should identify an empty iterable as not conforming to the test", (ava) => {
  const result = all([], () => true);
  ava.is(result, false);
});

test("should identify a number iterable with all values conforming to the test", (ava) => {
  const result = all([1, 2, 3], (num) => num < 4);
  ava.is(result, true);
});

test("should identify a boolean iterable with all values conforming to the test", (ava) => {
  const result = all([true, true, true], (bool) => bool);
  ava.is(result, true);
});

test("should identify a string iterable with all values conforming to the test", (ava) => {
  const result = all(
    ["hello", "world", "how", "are", "you"],
    (str) => str.length <= 5
  );
  ava.is(result, true);
});

test("should identify a date iterable with all values conforming to the test", (ava) => {
  const result = all(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt > new Date(Date.UTC(1990, 1, 1))
  );
  ava.is(result, true);
});

test("should identify an object iterable with all values conforming to the test", (ava) => {
  const result = all(
    [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
    (obj) => obj.test !== "value0"
  );
  ava.is(result, true);
});

test("should identify a number iterable with all values that do __not__ conform to the test", (ava) => {
  const result = all([1, 2, 3], (num) => num < 3);
  ava.is(result, false);
});

test("should identify a boolean iterable with all values that do __not__ conform to the test", (ava) => {
  const result = all([true, true, true], (bool) => !bool);
  ava.is(result, false);
});

test("should identify a string iterable with all values that do __not__ conform to the test", (ava) => {
  const result = all(
    ["hello", "world", "how", "are", "you"],
    (str) => str.length > 6
  );
  ava.is(result, false);
});

test("should identify a date iterable with all values that do __not__ conform to the test", (ava) => {
  const result = all(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt < new Date(Date.UTC(990, 1, 1))
  );
  ava.is(result, false);
});

test("should identify an object iterable with all values that do __not__ conform to the test", (ava) => {
  const result = all(
    [{ test: "value1" }, { test: "value2" }, { test: "value3" }],
    (obj) => obj.test !== "value1"
  );
  ava.is(result, false);
});
