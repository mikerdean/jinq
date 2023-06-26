import { describe, it } from "mocha";
import should from "should";
import ExceptIterable from "./except";

describe("iterables > except", () => {
  it("should get an exception result of numbers", () => {
    const query = new ExceptIterable([1, 2, 3, 4, 5], [1, 2]);
    const result = [...query];
    should(result).deepEqual([3, 4, 5]);
  });

  it("should get an exception result of strings", () => {
    const query = new ExceptIterable(
      ["healthy", "bears", "are", "extremely", "rare"],
      ["healthy", "bears", "are", "super", "cool"]
    );

    const result = [...query];
    should(result).deepEqual(["extremely", "rare"]);
  });
});
