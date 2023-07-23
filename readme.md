# jinq

`jinq` is a project inspired by LINQ enumerable extensions from C#. This is a **fun** project to attempt a reproduction of those interfaces in Javascript.

## Installation

[ to be confirmed ]

## A basic example

```javascript
import { jinq } from "jinq";

const result = jinq([1, 2, 3, 4, 5])
  .where((x) => x > 2)
  .skip(2)
  .repeat(3)
  .toArray();

console.log(result); // [5, 5, 5]
```

`jinq` operates on iterables (including arrays, sets, maps etc) and will return an iterable result.

## Package information

This package is compiled as a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), there is no CommonJS package available. This means your project should target ESM in order to use this package.

## API details

### `jinq<T>(iterable: Iterable<T>): JinqIterable<T>`

All jinq operations must start with an import of the `jinq` method:

```javascript
import { jinq } from "jinq";

const query = jinq([1, 2, 3, 4, 5]);
```

Any further operations are chained from the resulting `JinqIterable<T>`. These are further detailed below.

#### `all(test: (item: T) => boolean): boolean`

This method iterates through the current iterable and returns a `boolean` if all of the items match the supplied test.

```javascript
const result = jinq([1, 2, 3, 4, 5]).all((x) => x < 10);
const result2 = jinq([1, 2, 3, 4, 5]).all((x) => x > 3);

console.log(result); // true
console.log(result2); // false
```

#### `any(test: (item: T) => boolean): boolean`

This method iterates through the current iterable and returns a `boolean` if any one item matches the supplied test.

```javascript
const result = jinq([1, 2, 3, 4, 5]).any((x) => x > 4);
const result2 = jinq([1, 2, 3, 4, 5]).any((x) => x > 5);

console.log(result); // true
console.log(result2); // false
```

#### `append(item: T): JinqIterable<T>`

This method appends an item to the end of the current iterable. This can be chained with further jinq methods.

```javascript
const result = jinq([0, 25, 50, 75]).append(100).append(125).append(150);

console.log([...result]); // [0, 25, 50, 75, 100, 125, 150]
```

#### `concat(items: Iterable<T>): JinqIterable<T>`

This method appends the supplied items to the end of the current iterable. This can be chained with further jinq methods.

```javascript
const result = jinq([1, 2, 3, 4, 5]).concat([6, 7, 8, 9, 10]);

console.log([...result]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### `contains(item: T): boolean`

This method iterates through the current iterable looking for an exact match (using `Object.is`) for the supplied item and returns a `boolean` with the result.

```javascript
const item1 = { id: 1, value: "item 1" };
const item2 = { id: 2, value: "item 2" };
const item3 = { id: 3, value: "item 3" };

const result = jinq([item1, item2, item3]).contains(item2);
const result2 = jinq([item1, item3]).contains(item2);

console.log(result); // true
console.log(result2); // false
```

#### `count(test?: (item: T) => boolean): number`

This method iterates through the current iterable and returns a `number` representing the number of elements present. Optionally, you may supply a test to count only the elements that return `true` from the test.

```javascript
const result = jinq([1, 2, 3, 4, 5]).count();
const result2 = jinq([1, 2, 3, 4, 5]).count((x) => x > 3);

console.log(result); // 5
console.log(result2); // 2
```

#### `distinct(): JinqIterable<T>`

This method iterates through the current iterable and returns only distinct elements (using [SameZeroEquality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality)) from the iterable.

```javascript
const result = jinq([1, 1, 3, 4, 2, 2, 2, 5, 5, 5, 1]).distinct();

console.log([...result]); // [1, 3, 4, 2, 5]
```

#### `elementAt(index: number): T`

This method iterates through the current iterable and returns a single element at the provided index. This method will `throw` if you request an index that does not exist.

```javascript
const result = jinq([1, 2, 3, 4, 5]).elementAt(2);

console.log(result); // 3
```

#### `except(compareTo: Iterable<T>): JinqIterable<T>`

This method iterates through the current iterable and returns elements in your current iterable that **do not** appear in `compareTo`.

```javascript
const result = jinq(["healthy", "bears", "are", "extremely", "rare"]).except([
  "healthy",
  "bears",
  "are",
  "super",
  "cool",
]);

console.log([...result]); // ["extremely", "rare"];
```

#### `first(test?: (item: T) => boolean): T`

This method iterates through the current iterable and returns the first element in your iterable. Optionally, you may supply a test to include only the elements that return `true` from the test.

```javascript
const result = jinq([1, 2, 3, 4, 5]).first();
const result2 = jinq([1, 2, 3, 4, 5]).first((x) => x > 3);

console.log(result); // 1
console.log(result2); // 4
```

#### `firstOrDefault(defaultValue: T, test?: (item: T) => boolean): T`

This method iterates through the current iterable and returns the first element in your iterable. Optionally, you may supply a test to include only the elements that return `true` from the test.

If the query does not find any values, it will return the `defaultValue` you supply.

```javascript
const result = jinq([1, 2, 3, 4, 5]).firstOrDefault(25);
const result2 = jinq([1, 2, 3, 4, 5]).firstOrDefault(50, (x) => x > 3);
const result3 = jinq([]).firstOrDefault(75);
const result2 = jinq([1, 2, 3, 4, 5]).firstOrDefault(100, (x) => x > 5);

console.log(result); // 1
console.log(result2); // 4
console.log(result3); // 75
console.log(result4); // 100
```

#### `groupBy<TKey>(key: (item: TValue) => TKey): JinqIterable<JinqGroupBy<TKey, T>>`

This method iterates through the current iterable and returns elements grouped together by the result of the supplied `key`.

```javascript
const gamedata = [
  { id: 1, name: "DooM", type: "FPS" },
  { id: 2, name: "Blake Stone", type: "FPS" },
  { id: 3, name: "Command and Conquer", type: "RTS" },
  { id: 4, name: "Theme Hospital", type: "Management" },
  { id: 5, name: "Theme Park", type: "Management" },
  { id: 6, name: "Total Annihilation", type: "RTS" },
];

const result = jinq(gamedata).groupBy((game) => game.type);

console.log([...result]); /* [
  { key: "FPS", values: [
    { id: 1, name: "DooM", type: "FPS" },
    { id: 2, name: "Blake Stone", type: "FPS" },
  ],
  { key: "RTS", values: [
    { id: 3, name: "Command and Conquer", type: "RTS" },
    { id: 6, name: "Total Annihilation", type: "RTS" },
  ] },
  { key: "Management", values: [
    { id: 4, name: "Theme Hospital", type: "Management" },
    { id: 5, name: "Theme Park", type: "Management" },
  ]},
]
*/
```

#### `intersect(compareTo: Iterable<T>): JinqIterable<T>`

This method iterates through the current iterable and returns elements that appear in both your current iterable and `compareTo`.

```javascript
const result = jinq([1, 2, 3, 4, 5]).intersect([4, 5, 6, 7, 8]);

console.log([...result]); // [4, 5];
```
