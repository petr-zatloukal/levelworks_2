import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Tile from '../Tile/Tile';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectGridSize, setGrid } from '../../store/gridSlice';
import { generateMatrix } from '../../../../utils/matrix';
import { NullableNumber } from '../../../../utils/types';

const Page = () => {
	const dispatch = useAppDispatch();
	const gridSize = useAppSelector(selectGridSize);

	const grid = useMemo(() => {
		return generateMatrix(gridSize);
	}, [gridSize]);

	useEffect(() => {
		dispatch(setGrid(grid));
	}, [grid, dispatch]);

	return (
		<>
			{grid?.map((row, rowKey) => {
				return (
					<Row key={rowKey}>
						{row?.map((item: NullableNumber, itemKey: number) => {
							return <Tile x={itemKey} y={rowKey} key={itemKey} />;
						})}
					</Row>
				);
			})}
		</>
	);
};

export default Page;

const Row = styled.div`
	display: flex;
	flex-direction: row;
`;
