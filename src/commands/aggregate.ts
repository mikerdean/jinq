import type { JinqAccumulator } from "../types";

const aggregate = <T, TAccumulate>(
  iterable: Iterable<T>,
  seed: TAccumulate,
  accumulator: JinqAccumulator<T, TAccumulate>
): TAccumulate => {
  let value: TAccumulate = seed;

  for (const item of iterable) {
    value = accumulator(value, item);
  }

  return value;
};

export default aggregate;
