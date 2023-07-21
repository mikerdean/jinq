import { describe, it } from "mocha";
import should from "should";
import elementAt from "./elementAt.js";

describe("commands > elementAt", () => {
  it("should throw an error when an index less than zero is supplied", () => {
    should.throws(
      () => elementAt([1, 2, 3, 4, 5], -3),
      /^Error: Index must be greater than zero \(0\)\. Value was: -3$/,
    );
  });

  it("should throw an error when an empty iterable is supplied", () => {
    should.throws(
      () => elementAt([], 0),
      /^Error: Element at index 0 was not found\.$/,
    );
  });

  it("should throw an error when the supplied index is out of bounds", () => {
    should.throws(
      () => elementAt([1, 2, 3, 4, 5], 6),
      /^Error: Element at index 6 was not found\.$/,
    );
  });

  it("should return an zero based index", () => {
    const result = elementAt([1, 2, 3, 4, 5], 0);
    should(result).equal(1);
  });

  it("should return an element at the correct index", () => {
    const result = elementAt([1, 2, 3, 4, 5], 2);
    should(result).equal(3);
  });
});
