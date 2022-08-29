import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { onPress, selectGridElement } from "../store/gridSlice";

type TileProps = {
  x: number;
  y: number;
};

const Tile = ({ x, y }: TileProps) => {
  const [bgColor, setBgColor] = useState<string | null>();
  const gridValue = useAppSelector(selectGridElement(x, y));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gridValue) {
      setBgColor("yellow");
      const timer = setTimeout(() => {
        setBgColor("white");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gridValue]);

  const onClick = useCallback(() => {
    dispatch(onPress({ x, y }));
  }, [x, y, dispatch]);

  return (
    <StyledTile
      onClick={onClick}
      style={{ backgroundColor: bgColor || "white" }}
    >
      {gridValue}
    </StyledTile>
  );
};

export default Tile;

const StyledTile = styled.div`
  display: flex;
  border: 0.3px solid rgba(0, 0, 0, 0.24);
  height: 40px;
  min-width: 30px;
  max-width: 30px;
  margin: 1px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10%;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;
