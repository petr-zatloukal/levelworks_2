import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { findFibonacciSequence, transposeGrid } from "../../../utils/helpers";

type nullableNumber = number | null;
type grid = null | nullableNumber[][];

export interface CounterState {
  grid: grid;
  gridSize: number;
}

const initialState: CounterState = {
  grid: null,
  gridSize: 50,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<grid>) => {
      state.grid = action.payload;
    },
    onPress: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;

      const yMax = state?.grid?.length || 0;
      const xMax = state?.grid?.[0]?.length || 0;

      for (let i = 0; i < yMax; i++) {
        if (i === y) {
          continue;
        }
        incrementGridItem(state?.grid, x, i);
      }

      for (let j = 0; j < xMax; j++) {
        incrementGridItem(state?.grid, j, y);
      }

      //findFibonacciSequenceInGrid(state?.grid);
    },
  },
});

export const { setGrid, onPress } = gridSlice.actions;

export const selectGrid = (state: RootState) => state.grid.grid;
export const selectGirdSize = (state: RootState) => state.grid.gridSize;
export const selectGridElement = (x: number, y: number) => (state: RootState) =>
  state?.grid?.grid?.[y]?.[x];

export default gridSlice.reducer;

const incrementGridItem = (grid: grid, x: number, y: number) => {
  if (grid?.[y]?.[x] !== undefined) {
    const currentValue = grid?.[y]?.[x] || 0;
    grid[y][x] = currentValue + 1;
  }
};

const findFibonacciSequenceInGrid = (grid: grid) => {
  grid?.map((row: nullableNumber[], rowIndex) => {
    findSequenceInRow(row);
  });

  if (grid) {
    const gridCopy = JSON.parse(JSON.stringify(grid));
    const transposedGrid = transposeGrid(gridCopy);
    transposedGrid?.map((row: nullableNumber[], rowIndex) => {
      findSequenceInRow(row);
    });
  }
};

const findSequenceInRow = (row: nullableNumber[]) => {
  const output1 = findFibonacciSequence(row);
  const output2 = findFibonacciSequence([...row].reverse());

  console.log({ output1, output2 });
};
