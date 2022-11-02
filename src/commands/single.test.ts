import test from "ava";
import single from "./single";

test("should throw an error for an empty iterable", (ava) => {
  const err = ava.throws<Error>(() => single([], () => true));
  ava.is(err?.message, "item could not be found in iterable");
});

test("should throw an error when it cannot find an applicable item in the iterable", (ava) => {
  const err = ava.throws<Error>(() => single([true], () => false));
  ava.is(err?.message, "item could not be found in iterable");
});

test("should throw an error when more than one applicable item in the iterable", (ava) => {
  const err = ava.throws<Error>(() => single([true, true], () => true));
  ava.is(
    err?.message,
    "more than one item was found in this iterable matching your test"
  );
});

test("should return a single value of a number iterable which conforms to the test", (ava) => {
  const result = single([1, 2, 3], (num) => num > 2);
  ava.is(result, 3);
});

test("should return a single value of a boolean iterable which conforms to the test", (ava) => {
  const result = single([true, true, false], (bool) => !bool);
  ava.is(result, false);
});

test("should return a single value of a string iterable which conforms to the test", (ava) => {
  const result = single(
    ["hello", "world", "how", "are", "you"],
    (str) => str === "are"
  );
  ava.is(result, "are");
});

test("should return a single value of a date iterable which conforms to the test", (ava) => {
  const result = single(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt.toISOString() === "2022-10-15T00:00:00.000Z"
  );
  ava.is(result.toISOString(), "2022-10-15T00:00:00.000Z");
});

test("should a single value of an object iterable which conforms to the test", (ava) => {
  const obj1 = { test: "value1" };
  const obj2 = { test: "value2" };
  const obj3 = { test: "value3" };

  const result = single([obj1, obj2, obj3], (obj) => obj.test === "value2");
  ava.is(result, obj2);
});
