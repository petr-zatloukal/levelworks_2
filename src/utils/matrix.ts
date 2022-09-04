import { Grid } from './types';

export const generateMatrix = (size: number) => {
	return Array(size).fill(Array(size).fill(null));
};

export const transposeMatrix = (grid: Grid) => {
	const rows = grid?.length || 0;
	const cols = grid?.[0]?.length || 0;
	const output = [];
	for (let j = 0; j < cols; j++) {
		output[j] = Array(rows);
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			output[j][i] = grid?.[i]?.[j];
		}
	}
	return output;
};
