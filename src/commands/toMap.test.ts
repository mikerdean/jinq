import test from "ava";
import toMap from "./toMap";

test("should convert an array to a map of the appropriate type", (ava) => {
  const arr = [1, 2, 3, 4, 5];

  const result = toMap(arr, (num) => num + 100);
  ava.is(result instanceof Map, true, "isMap");
  ava.not(result, arr);
  ava.deepEqual(
    result,
    new Map([
      [101, 1],
      [102, 2],
      [103, 3],
      [104, 4],
      [105, 5],
    ])
  );
});

test("should convert an array of objects to a map of the appropriate type", (ava) => {
  const arr = [
    { key: "abc123", value: 1 },
    { key: "def567", value: 2 },
    { key: "ghi890", value: 3 },
  ];

  const result = toMap(arr, (x) => x.key);
  ava.is(result instanceof Map, true, "isMap");
  ava.not(result, arr);
  ava.deepEqual(
    result,
    new Map([
      ["abc123", { key: "abc123", value: 1 }],
      ["def567", { key: "def567", value: 2 }],
      ["ghi890", { key: "ghi890", value: 3 }],
    ])
  );
});
