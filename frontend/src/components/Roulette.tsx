import React, { useEffect, useState, useCallback } from "react";
import { ValueType, Item, rouletteData, ChipsData } from "../types";
import ChipComponent from "./ChipComponent";
import classNames from "classnames";

interface Props {
  onCellClick: (cell: Item) => void;
  rouletteData: rouletteData;
  chipsData: ChipsData;
}

const other_1_12 = { type: ValueType.NUMBERS_1_12 };
const other_2_12 = { type: ValueType.NUMBERS_2_12 };
const other_3_12 = { type: ValueType.NUMBERS_3_12 };
const other_1_18 = { type: ValueType.NUMBERS_1_18 };
const other_19_36 = { type: ValueType.NUMBERS_19_36 };
const other_even = { type: ValueType.EVEN };
const other_odd = { type: ValueType.ODD };
const other_red = { type: ValueType.RED };
const other_black = { type: ValueType.BLACK };

const Board: React.FC<Props> = ({ rouletteData, chipsData, onCellClick }) => {
  const [numbers, setNumbers] = useState<Item[][]>([]);
  const [rouletteWheelNumbers, setRouletteWheelNumbers] = useState<number[]>([]);
  const totalNumbers = 37;

  useEffect(() => {
    setNumbers(getNumbersList());
    setRouletteWheelNumbers(rouletteData.numbers);
  }, [rouletteData]);

  const getRouletteColor = useCallback(
    (number: number) => {
      const index = rouletteWheelNumbers.indexOf(number);
      const i =
        index >= 0
          ? index % totalNumbers
          : totalNumbers - Math.abs(index % totalNumbers);
      return i === 0 || number == null ? "none" : i % 2 === 0 ? "black" : "red";
    },
    [rouletteWheelNumbers, totalNumbers]
  );

  const getClassNamesFromCellItemType = useCallback(
    (type: ValueType, number: number | null) => {
      let isEvenOdd = 0;
      if (number != null && type === ValueType.NUMBER && number !== 0) {
        isEvenOdd = number % 2 === 0 ? 1 : 2;
      }
      return classNames({
        "board-cell-number": type === ValueType.NUMBER,
        "board-cell-double-split": type === ValueType.DOUBLE_SPLIT,
        "board-cell-quad-split": type === ValueType.QUAD_SPLIT,
        "board-cell-triple-split": type === ValueType.TRIPLE_SPLIT,
        "board-cell-empty": type === ValueType.EMPTY,
        "board-cell-even": type === ValueType.EVEN || isEvenOdd === 1,
        "board-cell-odd": type === ValueType.ODD || isEvenOdd === 2,
        "board-cell-number-1-18":
          type === ValueType.NUMBERS_1_18 ||
          (number !== null && number >= 1 && number <= 18 && type === ValueType.NUMBER),
        "board-cell-number-19-36":
          type === ValueType.NUMBERS_19_36 ||
          (number !== null && number >= 19 && number <= 36 && type === ValueType.NUMBER),
        "board-cell-number-1-12":
          type === ValueType.NUMBERS_1_12 ||
          (number !== null && number % 3 === 0 && type === ValueType.NUMBER && number !== 0),
        "board-cell-number-2-12":
          type === ValueType.NUMBERS_2_12 ||
          (number !== null && number % 3 === 2 && type === ValueType.NUMBER),
        "board-cell-number-3-12":
          type === ValueType.NUMBERS_3_12 ||
          (number !== null && number % 3 === 1 && type === ValueType.NUMBER),
        "board-cell-red":
          type === ValueType.RED ||
          (number !== null && getRouletteColor(number) === "red" && type === ValueType.NUMBER),
        "board-cell-black":
          type === ValueType.BLACK ||
          (number !== null && getRouletteColor(number) === "black" && type === ValueType.NUMBER),
      });
    },
    [getRouletteColor]
  );

  const getNumbersList = () => {
    const colList: Item[][] = [];
    let difference = 3;

    for (let i = 1; i <= 5; i++) {
      let rowList: Item[] = [];
      let startNumberSub = 0;

      if (i === 3) {
        startNumberSub = 1;
      } else if (i === 5) {
        startNumberSub = 2;
      }

      let nextStartNumberSub = 0;
      if (i + 1 === 3) {
        nextStartNumberSub = 1;
      } else if (i + 1 === 5) {
        nextStartNumberSub = 2;
      }

      let prevStartNumberSub = 0;
      if (i - 1 === 3) {
        prevStartNumberSub = 1;
      } else if (i - 1 === 5) {
        prevStartNumberSub = 2;
      }

      if (i === 1) {
        rowList.push({ type: ValueType.NUMBER, value: 0 });
      }

      for (let j = 1; j <= 26; j++) {
        let cell = {} as Item;

        if (j > 24) {
          cell.type = ValueType.EMPTY;
          rowList.push(cell);
          continue;
        }

        if (i % 2 === 0) {
          if (j === 1) {
            let leftNumber = 0;
            let topNumber = difference - prevStartNumberSub;
            let bottomNumber = difference - nextStartNumberSub;

            cell.type = ValueType.TRIPLE_SPLIT;
            cell.valueSplit = [leftNumber, topNumber, bottomNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let topNumber = ((j - 2) / 2) * difference + difference - prevStartNumberSub;
              let bottomNumber = ((j - 2) / 2) * difference + difference - nextStartNumberSub;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [topNumber, bottomNumber];
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - prevStartNumberSub;
              let rightNumber = leftNumber + difference;
              let bottomLeftNumber = ((j - 1) / 2) * difference - nextStartNumberSub;
              let bottomRightNumber = bottomLeftNumber + difference;
              cell.type = ValueType.QUAD_SPLIT;
              cell.valueSplit = [leftNumber, rightNumber, bottomLeftNumber, bottomRightNumber];
              rowList.push(cell);
            }
          }
        } else {
          if (j === 1) {
            let leftNumber = 0;
            let rightNumber = leftNumber + difference;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let currentNumber = ((j - 2) / 2) * difference + difference - startNumberSub;
              cell.type = ValueType.NUMBER;
              cell.value = currentNumber;
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - startNumberSub;
              let rightNumber = leftNumber + difference;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [leftNumber, rightNumber];
              rowList.push(cell);
            }
          }
        }
      }
      colList.push(rowList);
    }
    return colList;
  };
  const currentItemChips_1_12 = chipsData.placedChips.get(other_1_12);
  const currentItemChips_2_12 = chipsData.placedChips.get(other_2_12);
  const currentItemChips_3_12 = chipsData.placedChips.get(other_3_12);
  const currentItemChips_1_18 = chipsData.placedChips.get(other_1_18);
  const currentItemChips_even = chipsData.placedChips.get(other_even);
  const currentItemChips_red = chipsData.placedChips.get(other_red);
  const currentItemChips_black = chipsData.placedChips.get(other_black);
  const currentItemChips_odd = chipsData.placedChips.get(other_odd);
  const currentItemChips_19_36 = chipsData.placedChips.get(other_19_36);

  return (
    <div className="roulette-board-wrapper">
      <div className="roulette-board">
        <div className="roulette-board-grid-numbers">
          <table>
            <tbody>
              {numbers.map((item: Item[], colIndex: number) => {
                let keyId = 0;
                return (
                  <tr key={`tr_board_${colIndex}`}>
                    {item.map((cell: Item, rowIndex: number) => {
                      const cellClass = getClassNamesFromCellItemType(
                        cell.type,
                        (cell.value || null)
                      );
                      if (
                        cell.type === ValueType.NUMBER &&
                        cell.value === 0
                      ) {
                        const uniqueId = `${rowIndex}_${colIndex}_${cell.type}_${cell.value}`;
                        const tdKey = `td_${uniqueId}`;
                        const chipKey = `chip_${uniqueId}`;

                        const currentItemChips = chipsData.placedChips.get(
                          cell
                        );
                        return (
                          <ChipComponent
                            key={tdKey}
                            currentItemChips={currentItemChips}
                            tdKey={tdKey}
                            chipKey={chipKey}
                            cell={cell}
                            cellClass={cellClass}
                            rowSpan={5}
                            colSpan={1}
                            onCellClick={onCellClick}
                            leftMin={undefined}
                            leftMax={undefined}
                            topMin={undefined} topMax={undefined}
                          />
                        );
                      } else {
                        const chipKeyValue = cell.value || `split_${cell.valueSplit}`;
                        const uniqueId = `${rowIndex}_${colIndex}_${cell.type}_${chipKeyValue}`;
                        const tdKey = `td_${uniqueId}`;
                        const chipKey = `chip_${uniqueId}`;

                        if (cell.type === ValueType.EMPTY) {
                          keyId ++;
                          return (
                            <td
                              key={`empty_${keyId}`}
                              className={cellClass}
                            ></td>
                          );
                        } else {
                          const currentItemChips = chipsData.placedChips.get(
                            cell
                          );

                          return (
                            <ChipComponent
                              key={tdKey}
                              currentItemChips={currentItemChips}
                              tdKey={tdKey}
                              chipKey={chipKey}
                              cell={cell}
                              rowSpan={1}
                              colSpan={1}
                              cellClass={cellClass}
                              onCellClick={onCellClick}
                              leftMin={undefined}
                              leftMax={undefined}
                              topMin={undefined}
                              topMax={undefined}
                            />
                          );
                        }
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="roulette-board-grid-other">
          <table>
            <tbody>
              <tr>
                <td colSpan={2}></td>
                <ChipComponent
                  currentItemChips={currentItemChips_1_12}
                  tdKey={"td_other_1_12"}
                  chipKey={"chip_other_1_12"}
                  cell={other_1_12}
                  rowSpan={1}
                  colSpan={7}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_1_12,
                    null
                  )}
                  leftMin={70}
                  leftMax={140}
                  onCellClick={onCellClick}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={currentItemChips_2_12}
                  tdKey={"td_other_2_12"}
                  chipKey={"chip_other_2_12"}
                  cell={other_2_12}
                  rowSpan={1}
                  colSpan={6}
                  leftMin={70}
                  leftMax={140}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_2_12,
                    null
                  )}
                  onCellClick={onCellClick}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={currentItemChips_3_12}
                  tdKey={"td_other_3_12"}
                  chipKey={"chip_other_3_12"}
                  cell={other_3_12}
                  rowSpan={1}
                  colSpan={6}
                  leftMin={70}
                  leftMax={140}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_3_12,
                    null
                  )}
                  onCellClick={onCellClick}
                />
              </tr>
              <tr>
                <td colSpan={2}></td>
                <ChipComponent
                  currentItemChips={currentItemChips_1_18}
                  tdKey={"td_other_1_18"}
                  chipKey={"chip_other_1_18"}
                  cell={other_1_18}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_1_18,
                    null
                  )}
                  onCellClick={onCellClick}
                />
                <td></td>
                  <ChipComponent
                    currentItemChips={currentItemChips_even}
                    tdKey={"td_other_even"}
                    chipKey={"chip_other_even"}
                    cell={other_even}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={getClassNamesFromCellItemType(
                      ValueType.EVEN,
                      null
                    )}
                    onCellClick={onCellClick}
                  />
                  <td></td>
                  <ChipComponent
                    currentItemChips={currentItemChips_red}
                    tdKey={"td_other_red"}
                    chipKey={"chip_other_red"}
                    cell={other_red}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={getClassNamesFromCellItemType(
                      ValueType.RED,
                      null
                    )}
                    onCellClick={onCellClick}
                  />
                  <td></td>
                  <ChipComponent
                    currentItemChips={currentItemChips_black}
                    tdKey={"td_other_black"}
                    chipKey={"chip_other_black"}
                    cell={other_black}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={getClassNamesFromCellItemType(
                      ValueType.BLACK,
                      null
                    )}
                    onCellClick={onCellClick}
                  />
                  <td></td>
                  <ChipComponent
                    currentItemChips={currentItemChips_odd}
                    tdKey={"td_other_odd"}
                    chipKey={"chip_other_odd"}
                    cell={other_odd}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={getClassNamesFromCellItemType(
                      ValueType.ODD,
                      null
                    )}
                    onCellClick={onCellClick}
                  />
                  <td></td>
                  <ChipComponent
                    currentItemChips={currentItemChips_19_36}
                    tdKey={"td_other_19_36"}
                    chipKey={"chip_other_19_36"}
                    cell={other_19_36}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={getClassNamesFromCellItemType(
                      ValueType.NUMBERS_19_36,
                      null
                    )}
                    onCellClick={onCellClick}
                  />
                </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Board;
