import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { clearGridItem, onPress, selectGridElement, selectResultGridElement } from '../../store/gridSlice';
import { NullableString } from '../../../../utils/types';
import styles from './tile.module.css';
import { timeoutCallback } from '../../../../utils/helper';

type TileProps = {
	x: number;
	y: number;
};

const Tile = ({ x, y }: TileProps) => {
	const [className, setClassName] = useState<NullableString>(null);
	const gridValue = useAppSelector(selectGridElement(x, y));
	const isFibonacci = useAppSelector(selectResultGridElement(x, y));
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isFibonacci) {
			setClassName('fibonacci');
			return timeoutCallback(() => {
				dispatch(clearGridItem({ x, y }));
			}, 1000);
		} else if (gridValue) {
			setClassName('changed');
		}
	}, [isFibonacci, gridValue, dispatch, x, y]);

	useEffect(() => {
		if (className) {
			return timeoutCallback(() => {
				setClassName(null);
			}, 1000);
		}
	}, [className]);

	const onClick = useCallback(() => {
		dispatch(onPress({ x, y }));
	}, [x, y, dispatch]);

	return (
		<div onClick={onClick} className={`${className ? styles?.[className] : ''} ${styles.tile}`}>
			{gridValue}
		</div>
	);
};

export default Tile;
