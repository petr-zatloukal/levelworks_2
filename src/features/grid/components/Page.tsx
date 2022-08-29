import { useEffect, useMemo } from "react";
import styled from "styled-components";
import Tile from "./Tile";
import { generateEmptyMatrix } from "../../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectGirdSize, setGrid } from "../store/gridSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const gridSize = useAppSelector(selectGirdSize);

  useEffect(() => {
    if (gridSize) {
      const output = generateEmptyMatrix(gridSize);
      dispatch(setGrid(output));
    }
  }, [gridSize, dispatch]);

  const grid = useMemo(() => {
    return generateEmptyMatrix(gridSize);
  }, [gridSize]);

  return (
    <>
      {grid?.map((row, rowKey) => {
        return (
          <Row key={rowKey}>
            {row.map((item, itemKey) => {
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
