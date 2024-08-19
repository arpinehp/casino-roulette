import React from "react";
import classNames from "classnames";

import { ChipValue, StyledChip } from "./styles";
import { Item } from "../types";

interface ChipProps {
  currentItemChips?: {
    sum: number;
  };
  currentItem: Item;
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
}

const Chip: React.FC<ChipProps> = ({
  currentItemChips,
  currentItem,
  leftMin = -10,
  leftMax = 10,
  topMin = -30,
  topMax = 0,
}) => {
  const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

  const getChipClasses = (chip: number) =>
    classNames({
      'chip-100-placed': chip === 100,
      'chip-20-placed': chip === 20,
      'chip-10-placed': chip === 10,
      'chip-5-placed': chip === 5,
      chipValueImage: true,
    });

  if (!currentItemChips) {
    return null;
  }

  const chipsImgs: JSX.Element[] = [];
  let total = 0;
  const chipData = currentItemChips;

  const chipValues = [100, 20, 10, 5];

  while (total < chipData.sum) {
    for (const chipValue of chipValues) {
      const totalSum = chipData.sum - total;
      if (totalSum >= chipValue) {
        const calc = totalSum - (totalSum % chipValue);
        total += calc;
        const currentChipPlaced = calc / chipValue;

        for (let i = 0; i < currentChipPlaced; i++) {
          const key = `${currentItem.type}_${currentItem.value}_${chipValue}_${i}`;
          const style = {
            top: `${randomNumber(topMin, topMax)}px`,
            left: `${randomNumber(leftMin, leftMax)}px`,
          };

          chipsImgs.push(
            <StyledChip key={key} style={style} className={getChipClasses(chipValue)} />
          );
        }
        break; // Break after processing the largest chip value that fits
      }
    }
  }

  return <ChipValue>{chipsImgs}</ChipValue>;
};

export default Chip;
