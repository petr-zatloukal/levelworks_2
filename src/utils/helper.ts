import { Grid, NullableNumber } from './types';
import { findFibonacciSequence } from './fibonacci';

export const findResults = (grid: Grid, sequenceLength: number, x: number, y: number) => {
	const mainRowResult = findResultsInMainRow(grid, sequenceLength, y);
	const mainColResult = findResultsInMainColumn(grid, sequenceLength, x);
	const secondaryRowResult = findResultsInSecondaryRows(grid, sequenceLength, x);
	const secondaryColResult = findResultsInSecondaryCols(grid, sequenceLength, y);

	return [...mainRowResult, ...mainColResult, ...secondaryRowResult, ...secondaryColResult];
};

export const findResultsFull = (grid: Grid, sequenceLength: number) => {
	const rowResults = findResultsInAllRows(grid, sequenceLength);
	const colResults = findResultsInAllColumns(grid, sequenceLength);
	return [...rowResults, ...colResults];
};

const findResultsInArray = (array: NullableNumber[], sequenceLength: number): [number, number][] => {
	const inputLength = array?.length;
	const straightOutput = findFibonacciSequence(array, sequenceLength);
	const reversedOutput = findFibonacciSequence(reverseArray(array), sequenceLength);

	const output = reversedOutput?.map(result =>
		result?.map(coordinate => Math.abs(coordinate - (inputLength - 1)))?.reverse(),
	);

	return [...straightOutput, ...output] as [number, number][];
};

const findAllIndexes = (array: NullableNumber[], sequenceLength: number) => {
	return getAllMembersIndexes(findResultsInArray(array, sequenceLength));
};

const getAllMembersIndexes = (data: [number, number][]) => {
	return data.reduce((output: number[], item) => {
		const [start, end] = item;
		for (let i = start; i <= end; i++) {
			output.push(i);
		}
		return output;
	}, []);
};

const findResultsInAllRows = (grid: Grid, sequenceLength: number): [number, number][] => {
	return (
		grid?.reduce((output: [number, number][], row, index) => {
			findAllIndexes(row, sequenceLength).forEach(item => {
				output.push([item, index]);
			}, []);
			return output;
		}, []) || []
	);
};

const findResultsInAllColumns = (grid: Grid, sequenceLength: number) => {
	return (
		grid?.[0]?.reduce((output: [number, number][], _, index) => {
			const column = getColumnFromGrid(grid, index);
			findAllIndexes(column, sequenceLength).forEach(item => {
				output.push([index, item]);
			}, []);
			return output;
		}, []) || []
	);
};

const getColumnFromGrid = (grid: Grid, x: number): NullableNumber[] => {
	return (
		grid?.reduce((output, row) => {
			output.push(row[x]);
			return output;
		}, []) || []
	);
};

const findResultsInMainRow = (grid: Grid, sequenceLength: number, y: number) => {
	return findAllIndexes(grid?.[y] || [], sequenceLength).map(item => {
		return [item, y];
	});
};

const findResultsInMainColumn = (grid: Grid, sequenceLength: number, x: number) => {
	const column = getColumnFromGrid(grid, x);
	return findAllIndexes(column, sequenceLength).map(item => {
		return [x, item];
	});
};

const findResultsInSecondaryRows = (grid: Grid, sequenceLength: number, x: number) => {
	const output: [number, number][] = [];
	if (grid) {
		const from = Math.max(x - (sequenceLength - 1), 0);
		const to = Math.min(x + sequenceLength, grid.length);
		for (let i = 0; i < grid.length; i++) {
			findAllIndexes(grid[i].slice(from, to), sequenceLength).forEach(item => {
				output.push([item + from, i]);
			});
		}
	}

	return output;
};

const findResultsInSecondaryCols = (grid: Grid, sequenceLength: number, y: number) => {
	const output: [number, number][] = [];
	if (grid) {
		const from = Math.max(y - (sequenceLength - 1), 0);
		const to = Math.min(y + sequenceLength, grid.length);
		for (let i = 0; i < grid.length; i++) {
			const column = getColumnFromGrid(grid, i);
			findAllIndexes(column.slice(from, to), sequenceLength).forEach(item => {
				output.push([i, item + from]);
			});
		}
	}
	return output;
};

const reverseArray = (array: any[]) => {
	return [...array].reverse();
};

export const timeoutCallback = (callback: (...props: any[]) => void, timeout = 2000) => {
	const timer = setTimeout(callback, timeout);
	return () => {
		clearTimeout(timer);
	};
};
