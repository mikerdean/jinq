import { describe, it } from "mocha";
import should from "should";
import IntersectIterable from "./intersect";

describe("iterables > intersect", () => {
  it("should get an intersection of numbers", () => {
    const query = new IntersectIterable([1, 2, 3, 4, 5], [3, 4, 5]);
    const result = [...query];
    should(result).deepEqual([3, 4, 5]);
  });

  it("should get an intersection of strings", () => {
    const query = new IntersectIterable(
      ["healthy", "bears", "are", "extremely", "rare"],
      ["healthy", "bears", "are", "super", "cool"]
    );

    const result = [...query];
    should(result).deepEqual(["healthy", "bears", "are"]);
  });
});
