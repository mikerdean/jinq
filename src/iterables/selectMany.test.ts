import test from "ava";
import SelectManyIterable from "./selectMany";

const actors = [
  { id: 1, title: "Alien", tags: ["horror", "sci-fi", "alien"] },
  { id: 2, title: "Blade Runner", tags: ["cyberpunk", "android"] },
  { id: 3, title: "Predator", tags: ["action", "arnold", "jungle"] },
];

test("should correctly select from an iterable", (ava) => {
  const query = new SelectManyIterable(actors, (actor) => actor.tags);
  const result = [...query];

  ava.deepEqual(result, [
    "horror",
    "sci-fi",
    "alien",
    "cyberpunk",
    "android",
    "action",
    "arnold",
    "jungle",
  ]);
});
