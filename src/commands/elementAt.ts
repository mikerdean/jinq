const elementAt = <T>(iterable: Iterable<T>, index: number): T => {
  if (index < 0) {
    throw Error(`Index must be greater than zero (0). Value was: ${index}`);
  }

  let currentIndex = 0;

  for (const item of iterable) {
    if (currentIndex === index) {
      return item;
    }

    currentIndex += 1;
  }

  throw Error(`Element at index ${index} was not found.`);
};

export default elementAt;
