import test from "ava";
import first from "./first";

test("should throw an error for an empty iterable", (ava) => {
  const err = ava.throws<Error>(() => first([], () => true));
  ava.is(err?.message, "item could not be found in iterable");
});

test("should throw an error when it cannot find an applicable item in the iterable", (ava) => {
  const err = ava.throws<Error>(() => first([true], () => false));
  ava.is(err?.message, "item could not be found in iterable");
});

test("should return the first value of a number iterable which conforms to the test", (ava) => {
  const result = first([1, 2, 3], (num) => num < 3);
  ava.is(result, 1);
});

test("should return the first value of a boolean iterable which conforms to the test", (ava) => {
  const result = first([true, true, false], (bool) => bool);
  ava.is(result, true);
});

test("should return the first value of a string iterable which conforms to the test", (ava) => {
  const result = first(
    ["hello", "world", "how", "are", "you"],
    (str) => str.length < 5
  );
  ava.is(result, "how");
});

test("should return the first value of a date iterable which conforms to the test", (ava) => {
  const result = first(
    [
      new Date(Date.UTC(1992, 4, 2)),
      new Date(Date.UTC(2001, 5, 23)),
      new Date(Date.UTC(2022, 9, 15)),
    ],
    (dt) => dt > new Date(Date.UTC(2000, 1, 1))
  );
  ava.is(result.toISOString(), "2001-06-23T00:00:00.000Z");
});

test("should return a the first value of an object iterable of values which conform to the test", (ava) => {
  const obj1 = { test: "value1" };
  const obj2 = { test: "value2" };
  const obj3 = { test: "value3" };

  const result = first([obj1, obj2, obj3], (obj) => obj.test === "value2");
  ava.is(result, obj2);
});
