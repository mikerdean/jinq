import test from "ava";
import SelectIterable from "./select";

const actors = [
  { id: 1, forenames: "Arnold", surname: "Schwarzenegger" },
  { id: 2, forenames: "Sylvester", surname: "Stallone" },
  { id: 3, forenames: "Jason", surname: "Statham" },
];

test("should correctly select from an iterable", (ava) => {
  const query = new SelectIterable(actors, (actor) => actor.id);
  const result = [...query];

  ava.deepEqual(result, [1, 2, 3]);
});

test("should correctly select from an iterable when actioned twice", (ava) => {
  const query = new SelectIterable(actors, ({ id, surname }) => ({
    id,
    surname,
  }));

  const query2 = new SelectIterable(query, (actor) => actor.id);

  const result = [...query];
  const result2 = [...query2];

  ava.not(query, query2);

  ava.deepEqual(result, [
    { id: 1, surname: "Schwarzenegger" },
    { id: 2, surname: "Stallone" },
    { id: 3, surname: "Statham" },
  ]);

  ava.deepEqual(result2, [1, 2, 3]);
});
