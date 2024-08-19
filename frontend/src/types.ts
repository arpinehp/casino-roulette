export enum ValueType {
  NUMBER,
  NUMBERS_1_12,
  NUMBERS_2_12,
  NUMBERS_3_12,
  NUMBERS_1_18,
  NUMBERS_19_36,
  EVEN,
  ODD,
  RED,
  BLACK,
  DOUBLE_SPLIT,
  QUAD_SPLIT,
  TRIPLE_SPLIT,
  EMPTY,
};

export interface Item {
  type: ValueType;
  value?: number;
  valueSplit?: number[];
};

export interface PlacedChip {
  item: Item;
  sum: number;
};

export type rouletteData = {
  numbers: number[];
};

export type GameBoardState = {
  winningNumber: number | null;
  chipsData: ChipsData;
  winners: Winner[],
  username: string;
  endTime: number;
  progressCountdown: number;
  time_remaining: number;
  stage: GameStages;
  history: number[];
};

export type Winner = {
  username: string;
  sum: number;
};

export type ChipsData = {
  selectedChip: number | null;
  placedChips: Map<Item, PlacedChip>;
};

export enum GameStages {
  PLACE_BET,
  NO_MORE_BETS,
  WINNERS,
  NONE,
};

export type GameData = {
  stage: GameStages;
  time_remaining: number;
  winningNumber: number;
  wins: Winner[];
  history: number[];
};
