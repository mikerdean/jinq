import { describe, it } from "mocha";
import should from "should";
import OrderByIterable from "./orderBy.js";

describe("iterables > orderBy", () => {
  it("should order number values in ascending order correctly", () => {
    const query = new OrderByIterable([4, 1, 5, 3, 2], (x) => x, "asc");
    const result = [...query];
    should(result).deepEqual([1, 2, 3, 4, 5]);
  });

  it("should order number values in descending order correctly", () => {
    const query = new OrderByIterable([4, 1, 5, 3, 2], (x) => x, "desc");
    const result = [...query];
    should(result).deepEqual([5, 4, 3, 2, 1]);
  });

  it("should order number values with duplicates correctly", () => {
    const query = new OrderByIterable([10, 25, 15, 15, 5, 50], (x) => x, "asc");
    const result = [...query];
    should(result).deepEqual([5, 10, 15, 15, 25, 50]);
  });

  it("should order boolean values in ascending order correctly", () => {
    const query = new OrderByIterable(
      [true, true, false, false, true],
      (x) => x,
      "asc"
    );
    const result = [...query];
    should(result).deepEqual([false, false, true, true, true]);
  });

  it("should order boolean values in descending order correctly", () => {
    const query = new OrderByIterable(
      [true, true, false, false, true],
      (x) => x,
      "desc"
    );
    const result = [...query];
    should(result).deepEqual([true, true, true, false, false]);
  });

  it("should order string values in ascending order correctly", () => {
    const query = new OrderByIterable(
      ["three", "blind", "mice"],
      (x) => x,
      "asc"
    );
    const result = [...query];
    should(result).deepEqual(["blind", "mice", "three"]);
  });

  it("should order string values in descending order correctly", () => {
    const query = new OrderByIterable(
      ["you", "have", "been", "erased"],
      (x) => x,
      "desc"
    );
    const result = [...query];
    should(result).deepEqual(["you", "have", "erased", "been"]);
  });

  it("should order date values in ascending order correctly", () => {
    const query = new OrderByIterable(
      [
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
        new Date(Date.UTC(1992, 4, 2)),
      ],
      (dt) => dt,
      "asc"
    );

    const result = [...query].map((dt) => dt.toISOString());
    should(result).deepEqual([
      "1992-05-02T00:00:00.000Z",
      "2001-06-23T00:00:00.000Z",
      "2022-10-15T00:00:00.000Z",
    ]);
  });

  it("should order date values in descending order correctly", () => {
    const query = new OrderByIterable(
      [
        new Date(Date.UTC(2001, 5, 23)),
        new Date(Date.UTC(2022, 9, 15)),
        new Date(Date.UTC(1992, 4, 2)),
      ],
      (dt) => dt,
      "desc"
    );

    const result = [...query].map((dt) => dt.toISOString());
    should(result).deepEqual([
      "2022-10-15T00:00:00.000Z",
      "2001-06-23T00:00:00.000Z",
      "1992-05-02T00:00:00.000Z",
    ]);
  });

  it("should order objects by a specified value in ascending order correctly", () => {
    const user1 = { id: 1, forenames: "Harold", surname: "Sutcliffe" };
    const user2 = { id: 2, forenames: "Marie-anne", surname: "Baker" };
    const user3 = { id: 3, forenames: "Emma", surname: "Taylor" };
    const user4 = { id: 4, forenames: "James", surname: "Underwood" };
    const user5 = { id: 5, forenames: "David", surname: "Peters" };

    const query = new OrderByIterable(
      [user1, user2, user3, user4, user5],
      (user) => user.surname,
      "asc"
    );

    const result = [...query];
    should(result).deepEqual([user2, user5, user1, user3, user4]);
  });

  it("should order objects by a specified value in descending order correctly", () => {
    const user1 = { id: 1, forenames: "Harold", surname: "Sutcliffe" };
    const user2 = { id: 2, forenames: "Marie-anne", surname: "Baker" };
    const user3 = { id: 3, forenames: "Emma", surname: "Taylor" };
    const user4 = { id: 4, forenames: "James", surname: "Underwood" };
    const user5 = { id: 5, forenames: "David", surname: "Peters" };

    const query = new OrderByIterable(
      [user1, user2, user3, user4, user5],
      (user) => user.surname,
      "desc"
    );

    const result = [...query];
    should(result).deepEqual([user4, user3, user1, user5, user2]);
  });
});
