import React, { useState, useEffect, useCallback } from "react";
import { Grid, Paper, List, ListItem } from "@mui/material";
import classNames from "classnames";
import { io, Socket } from "socket.io-client";
import { Howl } from "howler";

import { Item, GameBoardState, GameData, GameStages } from "../types";
import { BASE_URL, ROULETTE_WHEEL_NUMBERS } from "../constants";
import Wheel from "../components/Wheel";
import Board from "../components/Roulette";
import Chat from "../components/Chat";
import ProgressBarRound from "../components/ProgressBarRound";
import {
  WinnerItemHeader,
  StyledTypography,
  WinnerHistory,
  ColoredTypography,
  ProgressBar,
  StyledContainer,
  RouletteActions,
  StyledListItem,
  ClearBetButton,
  PlaceBetButton,
  WinnerHistoryGrid,
} from "../components/styles";

interface Props {
  username: string;
}

const rouletteData = {
  numbers: ROULETTE_WHEEL_NUMBERS
};

const betSound = new Howl({
  src: ["/sounds/coin-sound.mp3"],
  volume: 0.5,
});

const GameBoard: React.FC<Props> = ({ username }) => {
  let socket: Socket | null = null;
  const [state, setState] = useState<GameBoardState>({
    chipsData: {
      selectedChip: null,
      placedChips: new Map()
    },
    winningNumber: null,
    winners: [{username: "testik", sum: 100}],
    history: [],
    stage: GameStages.NONE,
    username: "",
    endTime: 0,
    progressCountdown: 0,
    time_remaining: 0,
  });

  useEffect(() => {
    socket = io(BASE_URL);

    socket.on("stage-change", (data: string) => {
      const gameData = JSON.parse(data) as GameData;
      setGameData(gameData);
    });

    socket.on("connect", () => {
      socket?.emit("enter", username);
    });

    return () => {
      socket?.close();
    };
  }, [socket, username]);

  const setGameData = (gameData: GameData) => {
    let endTime = 25;
    if (gameData.stage === GameStages.NO_MORE_BETS) {
      endTime = 35;
    } else if (gameData.stage === GameStages.WINNERS) {
      endTime = 59;
    }
    setState((prevState: GameBoardState) => ({
      ...prevState,
      endTime,
      progressCountdown: endTime - gameData.time_remaining,
      winningNumber: gameData.winningNumber,
      stage: gameData.stage,
      time_remaining: gameData.time_remaining,
      winners: gameData.wins || [],
      history: gameData.history || []
    }));
  };

  const onCellClick = useCallback((item: Item) => {
    const { placedChips, selectedChip } = state.chipsData;
    if (!selectedChip) return;

    betSound.play();

    const currentChip = { item, sum: selectedChip };
    if (placedChips.has(item)) {
      currentChip.sum += placedChips.get(item)?.sum || 0;
    }

    placedChips.set(item, currentChip);
    setState((prevState: GameBoardState) => ({
      ...prevState,
      chipsData: {
        ...prevState.chipsData,
        placedChips
      }
    }));
  }, [state.chipsData.selectedChip, state.chipsData.placedChips]);

  const onChipClick = (chip: number | null) => {
    setState((prevState: GameBoardState) => ({
      ...prevState,
      chipsData: {
        ...prevState.chipsData,
        selectedChip: chip
      }
    }));
  };

  const getChipClasses = (chip: number) => {
    return classNames({
      chip_selected: chip === state.chipsData.selectedChip,
      "chip-100": chip === 100,
      "chip-20": chip === 20,
      "chip-10": chip === 10,
      "chip-5": chip === 5
    });
  };

  const placeBet = useCallback(() => {
    const { placedChips } = state.chipsData;
    const chips = Array.from(placedChips.values());
    socket?.emit("place-bet", JSON.stringify(chips));
  }, [socket]);

  const clearBet = () => {
    setState((prevState: GameBoardState) => ({
      ...prevState,
      chipsData: {
        ...prevState.chipsData,
        placedChips: new Map()
      }
    }));
  };

  const {
    chipsData,
    history,
    progressCountdown,
    stage,
    winners,
    winningNumber,
  } = state;

  return (
    <StyledContainer>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <WinnerItemHeader variant="h5">WINNERS</WinnerItemHeader>
            {winners.map((entry, index) => (
              <StyledTypography variant="h6" key={index} style={{marginLeft: "10rem"}}>
                {index + 1}. {entry.username} won {entry.sum}$
              </StyledTypography>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Wheel rouletteData={rouletteData} winningNumber={winningNumber} />
          </Grid>
          <WinnerHistoryGrid item xs={12} sm={4}>
            <WinnerHistory>
              {history.map((entry, index) => (
                <ColoredTypography
                  variant="body2"
                  key={index}
                  entry={entry}
                >
                  {entry}
                </ColoredTypography>
              ))}
            </WinnerHistory>
          </WinnerHistoryGrid>
        </Grid>
        <Board
          onCellClick={onCellClick}
          chipsData={chipsData}
          rouletteData={rouletteData}
        />
      </Paper>
      <ProgressBar>
        <ProgressBarRound
          stage={stage}
          maxDuration={progressCountdown}
        />
      </ProgressBar>
      <RouletteActions>
        <List>
          <ListItem>
            <ClearBetButton size="large" onClick={clearBet}>
              Clear Bet
            </ClearBetButton>
          </ListItem>
          {[100, 20, 10, 5].map((chip) => (
            <StyledListItem key={chip}>
              <div className={getChipClasses(chip)} onClick={() => onChipClick(chip)}>
                {chip}
              </div>
            </StyledListItem>
          ))}
          <ListItem>
            <PlaceBetButton
              disabled={stage !== GameStages.PLACE_BET}
              size="large"
              onClick={placeBet}
            >
              Place Bet
            </PlaceBetButton>
          </ListItem>
        </List>
      </RouletteActions>
      <Chat username={username} />
    </StyledContainer>
  );
};

export default GameBoard;
