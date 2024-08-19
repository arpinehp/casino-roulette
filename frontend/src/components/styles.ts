import styled from "styled-components";
import { Button, Grid, List, Typography } from "@mui/material";

import BlackChipSrc from '../assets/chip_black.png';
import BlueChipSrc from '../assets/chip_blue.png';
import OrangeChipSrc from '../assets/chip_orange.png';
import PurpleChipSrc from '../assets/chip_purple.png';
import BoardSrc from '../assets/Board.png';

import { BLACK_NUMBERS } from "../constants";

export const StyledContainer = styled.div`
  padding-top: 2rem;
  .MuiPaper-root {
    background: none;
    box-shadow: none;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  color: #f5f5dc;
`;

export const WinnerItemHeader = styled(StyledTypography)`
  text-align: center;
`;

export const WinnerHistoryGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

export const WinnerHistory = styled.div`
  p {
    float: left;
    margin-right: 1rem;
    color: #fff;
    font-weight: 900;
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
    align-content: center;
    text-align: center;
  }
`;

interface ColoredTypographyProps {
  entry: number;
};

export const ColoredTypography = styled(Typography)<ColoredTypographyProps>(({ entry }) => ({
  padding: ".5rem",
  backgroundColor:
    entry === 0
      ? 'green'
      : BLACK_NUMBERS.includes(entry)
      ? 'black'
      : 'red',
}));

export const ProgressBar = styled.div`
  width: 24rem;
  margin: 0 auto;
`;

export const RouletteActions = styled.div`
  display: block;
  position: relative;
  height: 15rem;
  .MuiList-root {
    position: absolute;
    button {
      width: 8rem;
    }
  }
`;

export const ClearBetButton = styled(Button)`
  background: linear-gradient(35deg, #ed6ea0, #ec8c69);
  color: white;
  padding: spacing(1.5, 3);
  textTransform: none;
  &:hover: {
    background: linear-gradient(35deg, #ec8c69, #ed6ea0);
  }
`;

export const PlaceBetButton = styled(Button) `
  background: linear-gradient(45deg, orange, red);
  color: white;
  padding: spacing(1.5, 3);
  textTransform: none;
  &:hover: {
    background: linear-gradient(45deg, red, orange);
  }
`;

export const StyledListItem = styled.div`
  list-style: none;
  margin: 0 0.5rem;
  display: block;
  div {
    position: relative;
    display: block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 63px;
    background: #333;
    border-radius: 50%;
    font-size: 18px;
    color: #ffff;
    transition: .5s;
  }
  div::before {
    content: '';
  }
  div::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ffee10;
    transition: .5s;
    transform: scale(.9);
    z-index: -1;
  }
  div:hover::before {
    transform: scale(1.1);
    box-shadow: 0 0 15px #ffee10;
  }
  div:hover {
    color: #ffee10;
    box-shadow: 0 0 5px #ffee10;
    text-shadow: 0 0 5px #ffee10;
  }
  div.chip_selected {
    color: #ffee10;
    box-shadow: 0 0 20px #ffee10;
    text-shadow: 0 0 5px #ffee10;
  }
  div.chip-100 {
    background-image: url(${BlackChipSrc});
    background-size: 60px 60px;
  }
  div.chip-20 {
    background-image: url(${BlueChipSrc});
    background-size: 60px 60px;
  }
  div.chip-10 {
    background-image: url(${OrangeChipSrc});
    background-size: 60px 60px;
  }
  div.chip-5 {
    background-image: url(${PurpleChipSrc});
    background-size: 60px 60px;
  }
`;

export const ChipValue = styled.div`
  position: relative;
`;

interface ChipSumProps {
  top: number;
  left: number
};

export const ChipSum = styled.div<ChipSumProps>(({ top, left }) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
}));

export const StyledRouletteBoard = styled.div`
  float: none;
  display: flow-root;
  width: 1000px;
  height: 420px;
  background: url(${BoardSrc});
  background-size: 1000px auto;
  margin: 0 auto;
`;


export const RouletteBoardGridNumbers = styled.div`
  display: grid;
  width: auto;
  height: 216px;
  margin-left: 37px;
  margin-right: 23px;
  margin-top: 27px;
  margin-bottom: 17px;
`;

export const RouletteBoardGridOther = styled.div`
  display: grid;
  width: auto;
  height: 216px;
  margin-left: 37px;
  margin-right: 23px;
  margin-top: 27px;
  margin-bottom: 17px;
`;

export const StyledProgressBar = styled.div`
  .MuiLinearProgress-root {
    height: 1rem;
    border-radius: 0.5rem;
  }
`;

export const ProgressRoundTitle = styled.div`
  text-align: center;
  margin: 2rem 0 0.5rem;
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
`;

export const StyledChip = styled.div`
  width: 30px;
  height: 30px;
  background-size: 30px 30px;
  &.chip-100-placed {
    background-image: url(${BlackChipSrc});
  }
  &.chip-20-placed {
    background-image: url(${BlueChipSrc});
  }
  &.chip-10-placed {
    background-image: url(${OrangeChipSrc});
  }
  &.chip-5-placed {
    background-image: url(${PurpleChipSrc});
  }
`;

export const StyledChat = styled.div`
  margin-top: -10rem;
  margin-right: 2rem;
  button {
    float: right;
    background-color: white;
    border-radius: 50%;
    padding: 1rem;
  }
`;

export const StyledChatContent = styled(Grid)`
  padding: 0.5rem;
  overflow-y: overlay;
`;

export const StyledChatHistory = styled(Grid)`
  overflow: auto;
  word-wrap: break-word;
`;

export const StyledChatHistoryList = styled(List)`
  flex-direction: column;
  display: contents;
`;
