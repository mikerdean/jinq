import { describe, it } from "mocha";
import should from "should";
import SelectIterable from "./select";

const setup = () => [
  { id: 1, forenames: "Arnold", surname: "Schwarzenegger" },
  { id: 2, forenames: "Sylvester", surname: "Stallone" },
  { id: 3, forenames: "Jason", surname: "Statham" },
];

describe("iterables > select", () => {
  it("should correctly select from an iterable", () => {
    const actors = setup();
    const query = new SelectIterable(actors, (actor) => actor.id);
    const result = [...query];

    should.deepEqual(result, [1, 2, 3]);
  });

  it("should correctly select from an iterable when actioned twice", () => {
    const actors = setup();
    const query = new SelectIterable(actors, ({ id, surname }) => ({
      id,
      surname,
    }));

    const query2 = new SelectIterable(query, (actor) => actor.id);

    const result = [...query];
    const result2 = [...query2];

    should.deepEqual(result, [
      { id: 1, surname: "Schwarzenegger" },
      { id: 2, surname: "Stallone" },
      { id: 3, surname: "Statham" },
    ]);

    should.deepEqual(result2, [1, 2, 3]);
  });
});
