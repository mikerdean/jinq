import { describe, it } from "mocha";
import should from "should";
import JinqIterable from "./jinqIterable";

describe("jinq iterable", () => {
  it("should find an element using contains", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]);
    const result = query.contains(4);
    should(result).equal(true);
  });

  it("should not find an element using contains", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]);
    const result = query.contains(6);
    should(result).equal(false);
  });

  it("should repeat elements using repeat", () => {
    const query = new JinqIterable([1, 2, 3]).repeat(2);
    const result = [...query];
    should.deepEqual(result, [1, 2, 3, 1, 2, 3]);
  });

  it("should filter using where", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).where((n) => n > 2);
    const result = [...query];
    should.deepEqual(result, [3, 4, 5]);
  });

  it("should filter using where twice", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5])
      .where((n) => n > 2)
      .where((n) => n > 4);

    const result = [...query];
    should.deepEqual(result, [5]);
  });

  it("should filter using reverse", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).reverse();

    const result = [...query];
    should.deepEqual(result, [5, 4, 3, 2, 1]);
  });

  it("should filter using reverse twice", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).reverse().reverse();

    const result = [...query];
    should.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  it("should filter using select", () => {
    const input = [
      { value: 1, text: "Value #1" },
      { value: 2, text: "Value #2" },
      { value: 3, text: "Value #3" },
      { value: 4, text: "Value #4" },
      { value: 5, text: "Value #5" },
    ];

    const query = new JinqIterable(input).select((x) => x.value);

    const result = [...query];
    should.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  it("should filter using select twice", () => {
    const input = [
      { value: 1, text: "Value #1", active: true },
      { value: 2, text: "Value #2", active: true },
      { value: 3, text: "Value #3", active: false },
      { value: 4, text: "Value #4", active: true },
      { value: 5, text: "Value #5", active: false },
    ];

    const query = new JinqIterable(input)
      .select(({ value, active }) => ({ value, active }))
      .select((x) => x.active);

    const result = [...query];
    should.deepEqual(result, [true, true, false, true, false]);
  });

  it("should filter using selectMany", () => {
    const input = [
      { id: 1, title: "Blog Post #1", tags: ["test", "flag", "nightmare"] },
      { id: 2, title: "Blog Post #2", tags: ["fire", "dog", "walking"] },
      { id: 3, title: "Blog Post #3", tags: ["derp", "engine", "cat"] },
    ];

    const query = new JinqIterable(input).selectMany((x) => x.tags);

    const result = [...query];
    should.deepEqual(result, [
      "test",
      "flag",
      "nightmare",
      "fire",
      "dog",
      "walking",
      "derp",
      "engine",
      "cat",
    ]);
  });

  it("should filter using skip", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).skip(3);

    const result = [...query];
    should.deepEqual(result, [4, 5]);
  });

  it("should filter using skip twice", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).skip(1).skip(3);

    const result = [...query];
    should.deepEqual(result, [5]);
  });

  it("should filter using take", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).take(3);

    const result = [...query];
    should.deepEqual(result, [1, 2, 3]);
  });

  it("should filter using take twice", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).take(3).take(1);

    const result = [...query];
    should.deepEqual(result, [1]);
  });

  it("should filter using group by", () => {
    const people = [
      { forenames: "Roger", surname: "Williams" },
      { forenames: "Yvonne", surname: "Ashcroft" },
      { forenames: "David", surname: "Ashcroft" },
      { forenames: "Gordon", surname: "Freeman" },
      { forenames: "Christopher", surname: "Ashcroft" },
      { forenames: "Sunny", surname: "Williams" },
      { forenames: "Mork", surname: "Doon" },
      { forenames: "Valerie", surname: "Freeman" },
    ];

    const query = new JinqIterable(people).groupBy((x) => x.surname);

    const result = [...query];
    should.deepEqual(result, [
      { key: "Williams", values: [people[0], people[5]] },
      { key: "Ashcroft", values: [people[1], people[2], people[4]] },
      { key: "Freeman", values: [people[3], people[7]] },
      { key: "Doon", values: [people[6]] },
    ]);
  });

  it("should filter using a combination of iterators (where and reverse)", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5])
      .where((n) => n > 2)
      .reverse();

    const result = [...query];
    should.deepEqual(result, [5, 4, 3]);
  });

  it("should filter using a combination of iterators (skip and take)", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5]).skip(3).take(1);

    const result = [...query];
    should.deepEqual(result, [4]);
  });

  it("should filter using a combination of iterators (where, skip and take)", () => {
    const query = new JinqIterable([1, 2, 3, 4, 5])
      .where((n) => n > 1)
      .skip(3)
      .take(1);

    const result = [...query];
    should.deepEqual(result, [5]);
  });

  it("should filter using a combination of iterators (where, skip and select)", () => {
    const input = [
      { value: 1, text: "Value #1", active: true },
      { value: 2, text: "Value #2", active: true },
      { value: 3, text: "Value #3", active: false },
      { value: 4, text: "Value #4", active: true },
      { value: 5, text: "Value #5", active: false },
    ];

    const query = new JinqIterable(input)
      .where((x) => x.active)
      .skip(1)
      .select((x) => x.value);

    const result = [...query];
    should.deepEqual(result, [2, 4]);
  });

  it("should filter using a combination of iterators (repeat, where, take)", () => {
    const input = [1, 2, 3, 4, 5];

    const query = new JinqIterable(input)
      .repeat(3)
      .where((x) => x > 3)
      .take(3);

    const result = [...query];
    should.deepEqual(result, [4, 5, 4]);
  });
});
