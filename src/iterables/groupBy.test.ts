import test from "ava";
import GroupByIterable from "./groupBy";

test("should correctly group an iterable by string key", (ava) => {
  const gamedata = [
    { id: 1, name: "DooM", type: "FPS" },
    { id: 2, name: "Blake Stone", type: "FPS" },
    { id: 3, name: "Command and Conquer", type: "RTS" },
    { id: 4, name: "Theme Hospital", type: "Management" },
    { id: 5, name: "Theme Park", type: "Management" },
    { id: 6, name: "Total Annihilation", type: "RTS" },
  ];

  const query = new GroupByIterable(gamedata, (game) => game.type);
  const result = [...query];

  ava.deepEqual(result, [
    { key: "FPS", values: [gamedata[0], gamedata[1]] },
    { key: "RTS", values: [gamedata[2], gamedata[5]] },
    { key: "Management", values: [gamedata[3], gamedata[4]] },
  ]);
});

test("should correctly group an iterable by number key", (ava) => {
  const typedata = [
    { name: "test 1", type: 2 },
    { name: "test 2", type: 1 },
    { name: "test 3", type: 1 },
    { name: "test 4", type: 1 },
    { name: "test 5", type: 3 },
    { name: "test 6", type: 1 },
    { name: "test 7", type: 3 },
    { name: "test 8", type: 2 },
    { name: "test 9", type: 2 },
    { name: "test 10", type: 9.75 },
  ];

  const query = new GroupByIterable(typedata, (game) => game.type);
  const result = [...query];

  ava.deepEqual(result, [
    { key: 2, values: [typedata[0], typedata[7], typedata[8]] },
    { key: 1, values: [typedata[1], typedata[2], typedata[3], typedata[5]] },
    { key: 3, values: [typedata[4], typedata[6]] },
    { key: 9.75, values: [typedata[9]] },
  ]);
});
