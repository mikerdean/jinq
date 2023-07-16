import { describe, it } from "mocha";
import should from "should";
import SelectManyIterable from "./selectMany.js";

const getMovies = () => [
  { id: 1, title: "Alien", tags: ["horror", "sci-fi", "alien"] },
  { id: 2, title: "Blade Runner", tags: ["cyberpunk", "android"] },
  { id: 3, title: "Predator", tags: ["action", "arnold", "jungle"] },
];

describe("iterables > selectMany", () => {
  it("should correctly select from an iterable", () => {
    const movies = getMovies();
    const query = new SelectManyIterable(movies, (movie) => movie.tags);
    const result = [...query];

    should.deepEqual(result, [
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
});
