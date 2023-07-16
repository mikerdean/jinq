import { describe, it } from "mocha";
import should from "should";
import DistinctIterable from "./distinct.js";

describe("iterables > distinct", () => {
  it("should get a distinct result of numbers", () => {
    const query = new DistinctIterable([1, 1, 2, 1, 1, 4, 2, 3, 3, 4, 5, 5, 5]);
    const result = [...query];
    should(result).deepEqual([1, 2, 4, 3, 5]);
  });

  it("should get a distinct result of strings", () => {
    const query = new DistinctIterable([
      "are",
      "you",
      "there?",
      "there?",
      "where",
      "where",
      "the",
      "skies",
      "are",
      "blue",
    ]);

    const result = [...query];
    should(result).deepEqual([
      "are",
      "you",
      "there?",
      "where",
      "the",
      "skies",
      "blue",
    ]);
  });
});
