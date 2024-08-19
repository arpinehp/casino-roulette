import React from "react";

import Chip from "./Chip";
import { ChipValue, ChipSum } from "./styles";
import { Item, PlacedChip } from "../types";

interface ChipComponentProps {
  currentItemChips: PlacedChip | undefined;
  cellClass: string;
  chipKey: string;
  tdKey: string;
  cell: Item;
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
  rowSpan?: number;
  colSpan?: number;
  onCellClick: (cell: Item) => void;
};

const ChipComponent: React.FC<ChipComponentProps> = ({
  currentItemChips,
  cellClass,
  chipKey,
  tdKey,
  cell,
  leftMin,
  leftMax,
  topMin,
  topMax,
  rowSpan,
  colSpan,
  onCellClick,
}) => {
  const sum = currentItemChips?.sum || "";

  const left = leftMin !== undefined && leftMax !== undefined
    ? leftMin + (leftMax - leftMin) / 2
    : 0;

  const top = topMin !== undefined && topMax !== undefined
    ? topMin + (topMax - topMin) / 2
    : -15;

  return (
    <td
      key={tdKey}
      className={cellClass}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onClick={() => {
        onCellClick(cell);
      }}
    >
      <Chip
        leftMin={leftMin}
        leftMax={leftMax}
        topMin={topMin}
        topMax={topMax}
        key={chipKey}
        currentItemChips={currentItemChips}
        currentItem={cell}
      />
      <ChipValue>
        <ChipSum top={top} left={left}>
          {sum}
        </ChipSum>
      </ChipValue>
    </td>
  );
};

export default React.memo(ChipComponent);
