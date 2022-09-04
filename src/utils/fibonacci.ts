import { NullableNumber } from './types';
import { memoize } from './memo';

const isFibonacciNumber = (x: number) => isPerfectSquare(5 * x * x - 4) || isPerfectSquare(5 * x * x + 4);
const isFibonacciNumberMem = memoize(isFibonacciNumber);

const isPerfectSquare = (x: number) => {
	const root = Math.sqrt(x);
	return root === parseInt(root.toString());
};

export const findFibonacciSequence = (dataArray: NullableNumber[], sequenceLength = 5) => {
	const windowSize = 3;
	const loopLength = dataArray.length - windowSize + 1;
	const results = [];
	let currentIndex = 0;
	let sequenceStart = null;

	while (currentIndex < loopLength) {
		const currentWindowValues = dataArray.slice(currentIndex, currentIndex + windowSize);
		const isSequenceRes = isSequenceMemo(currentWindowValues);
		if (isSequenceRes && sequenceStart === null) {
			if (currentWindowValues.every(item => isFibonacciNumberMem(item as number))) {
				sequenceStart = currentIndex;
			}
		} else if (isSequenceRes && sequenceStart !== null && currentIndex + 2 - sequenceStart === sequenceLength - 1) {
			results.push([sequenceStart, currentIndex + 2]);
			currentIndex = currentIndex + 2;
			sequenceStart = null;
		} else if (!isSequenceRes) {
			sequenceStart = null;
		}

		currentIndex++;
	}
	return results;
};

const isSequence = (members: NullableNumber[]): boolean => {
	const [x, y, z] = members;
	return !members.includes(null) && (x as number) + (y as number) === z;
};
const isSequenceMemo = memoize(isSequence);
