import test from "ava";
import { SingleValueError } from "./single";
import singleOrDefault from "./singleOrDefault";

test("should throw an error when more than one applicable item in the iterable", (ava) => {
  const err = ava.throws<SingleValueError<boolean>>(() =>
    singleOrDefault([true, true], () => true, false)
  );

  ava.is(
    err?.message,
    "more than one item was found in this iterable matching your test"
  );

  ava.deepEqual(err?.items, [true, true]);
});

test("should return the defaultValue for an empty iterable", (ava) => {
  const result = singleOrDefault([], (num) => num > 1, 55);
  ava.is(result, 55);
});

test("should return the defaultValue for an iterable when it cannot find an item", (ava) => {
  const result = singleOrDefault([1, 2, 3, 4, 5], (num) => num > 15, 89);
  ava.is(result, 89);
});

test("should return a single value of a number iterable which conforms to the test", (ava) => {
  const result = singleOrDefault([1, 2, 3], (num) => num > 2, 34);
  ava.is(result, 3);
  ava.not(result, 34);
});

test("should return a single value of a boolean iterable which conforms to the test", (ava) => {
  const result = singleOrDefault([true, true, false], (bool) => !bool, true);
  ava.is(result, false);
  ava.not(result, true);
});

test("should return a single value of a string iterable which conforms to the test", (ava) => {
  const result = singleOrDefault(
    ["hello", "world", "how", "are", "you"],
    (str) => str === "are",
    "doughnut"
  );
  ava.is(result, "are");
  ava.not(result, "doughtnut");
});

test("should return a single value of a date iterable which conforms to the test", (ava) => {
  const result = singleOrDefault(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt.toISOString() === "2022-10-15T00:00:00.000Z",
    new Date(Date.UTC(1900, 0, 1))
  );
  ava.is(result.toISOString(), "2022-10-15T00:00:00.000Z");
  ava.not(result.toISOString(), "1900-01-01T00:00:00.000Z");
});

test("should a single value of an object iterable which conforms to the test", (ava) => {
  const obj1 = { test: "value1" };
  const obj2 = { test: "value2" };
  const obj3 = { test: "value3" };
  const obj4 = { test: "value4" };

  const result = singleOrDefault(
    [obj1, obj2, obj3],
    (obj) => obj.test === "value2",
    obj4
  );
  ava.is(result, obj2);
  ava.not(result, obj4);
});
