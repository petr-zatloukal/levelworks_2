import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Grid } from '../../../utils/types';
import { findResults } from '../../../utils/helper';

export type MatrixState = {
	grid: Grid;
	resultGrid: Grid;
	gridSize: number;
	sequenceLength: number;
};

const initialState: MatrixState = {
	grid: null,
	resultGrid: null,
	gridSize: 50,
	sequenceLength: 5,
};

export const gridSlice = createSlice({
	name: 'grid',
	initialState,
	reducers: {
		setGrid: (state, action: PayloadAction<Grid>) => {
			state.grid = action.payload;
			state.resultGrid = action.payload;
		},
		onPress: (state, action: PayloadAction<{ x: number; y: number }>) => {
			const { x, y } = action.payload;
			incrementGrid(state?.grid, x, y);
			findFibonacci(state?.grid, state.resultGrid, state.sequenceLength, x, y);
		},
		clearGridItem: (state, action: PayloadAction<{ x: number; y: number }>) => {
			const { x, y } = action.payload;
			if (state?.resultGrid?.[y]?.[x]) {
				state.resultGrid[y][x] = null;
			}
			if (state?.grid?.[y]?.[x]) {
				state.grid[y][x] = null;
			}
		},
	},
});

export const { setGrid, onPress, clearGridItem } = gridSlice.actions;

export const selectGrid = (state: RootState) => state.grid.grid;
export const selectGridSize = (state: RootState) => state.grid.gridSize;
export const selectGridElement = (x: number, y: number) => (state: RootState) => state?.grid?.grid?.[y]?.[x];
export const selectResultGridElement = (x: number, y: number) => (state: RootState) =>
	state?.grid?.resultGrid?.[y]?.[x];

export default gridSlice.reducer;

const incrementGrid = (grid: Grid, x: number, y: number) => {
	const yMax = grid?.length || 0;
	const xMax = grid?.[0]?.length || 0;

	for (let i = 0; i < yMax; i++) {
		if (i === y) {
			continue;
		}
		incrementGridItem(grid, x, i);
	}

	for (let j = 0; j < xMax; j++) {
		incrementGridItem(grid, j, y);
	}
};

const findFibonacci = (grid: Grid, resultsGrid: Grid, sequenceLength: number, x: number, y: number) => {
	const results = findResults(grid, sequenceLength, x, y);
	results?.forEach(result => {
		const [rX, rY] = result;
		if (resultsGrid?.[rY]?.[rX] !== undefined) {
			resultsGrid[rY][rX] = 1;
		}
	});
	return results;
};

const incrementGridItem = (grid: Grid, x: number, y: number) => {
	if (grid?.[y]?.[x] !== undefined) {
		const currentValue = grid?.[y]?.[x] || 0;
		grid[y][x] = currentValue + 1;
	}
};
