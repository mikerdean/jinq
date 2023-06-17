# jinq

`jinq` is a project inspired by much use of LINQ in C#. This is a **fun** project to attempt a reproduction of those interfaces in Javascript.

Yes, I realise that Javascript arrays have a lot of these sorts of functions built in already.

## Installation

[ to be confirmed ]

## The basics

```javascript
import { jinq } from "jinq";

const result = jinq([1, 2, 3, 4, 5])
  .where((x) => x > 2)
  .take(2)
  .repeat(3)
  .toArray();

console.log(result); // [5, 5, 5]
```

`jinq` operates on iterables (including arrays, sets, maps etc) and will return an iterable result.

## API details

[ details to come ]