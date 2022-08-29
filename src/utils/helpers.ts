export const generateEmptyMatrix = (size: number) => {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(Array(size).fill(null));
  }

  return matrix;
};

export const findFibonacciSequence = (
  input: (null | number)[],
  sequenceLength = 5
) => {
  const windowLength = 3;
  const len = input.length - windowLength + 1;
  let sequenceStart = null;

  let currentIndex = 0;

  const results = [];
  while (currentIndex < len) {
    const current = input[currentIndex];
    const next = input[currentIndex + 1];
    const nextPerOne = input[currentIndex + 2];

    if (!current || !next || !nextPerOne) {
      currentIndex++;
      continue;
    }

    if (current + next === nextPerOne) {
      if (
        sequenceStart === null &&
        isFibonacciNumber(current) &&
        isFibonacciNumber(next)
      ) {
        sequenceStart = currentIndex;
      }

      if (
        sequenceStart !== null &&
        currentIndex + 2 - sequenceStart === sequenceLength - 1
      ) {
        results.push([sequenceStart, currentIndex + 2]);
        currentIndex = currentIndex + 2;
        sequenceStart = null;
      }
    } else {
      sequenceStart = null;
    }

    currentIndex++;
  }

  return results;
};

const isFibonacciNumber = (x: number) =>
  isPerfectSquare(5 * x * x - 4) || isPerfectSquare(5 * x * x + 4);

const isPerfectSquare = (x: number) => {
  const root = Math.sqrt(x);
  return root === parseInt(root.toString());
};

export const transposeGrid = (grid: (number | null)[][]) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const output = [];
  for (let j = 0; j < cols; j++) {
    output[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      output[j][i] = grid[i][j];
    }
  }
  return output;
};
