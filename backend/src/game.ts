import { Server } from "socket.io";
import { Server as HttpServer } from 'http';
import { Timer } from "easytimer.js";

import { GameData, GameStages, PlacedChip, ValueType, Winner } from "./types";
import { BLACK_NUMBERS, RED_NUMBERS } from "./constants";

const setupGame = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const timer = new Timer();
  const users = new Map<string, string>();
  let gameData = {} as GameData;
  const usersData = new Map<string, PlacedChip[]>();
  let wins = [] as Winner[];

  timer.addEventListener("secondsUpdated", (_) => {
    const currentSeconds = timer.getTimeValues().seconds;
    gameData.time_remaining = currentSeconds;

    if (currentSeconds === 1) {
      handlePlaceBetStage();
    } else if (currentSeconds === 25) {
      handleNoMoreBetsStage();
    } else if (currentSeconds === 35) {
      handleWinnersStage();
    }
  });

  function handlePlaceBetStage() {
    console.log("Place bet");
    usersData.clear();
    gameData.stage = GameStages.PLACE_BET;
    wins = [];
    sendStageEvent(gameData);
  };

  function handleNoMoreBetsStage() {
    gameData.stage = GameStages.NO_MORE_BETS;
    gameData.winningNumber = getRandomNumberInt(0, 36);
    console.log("No More Bets");
    sendStageEvent(gameData);

    for (const [key, chipsPlaced] of usersData.entries()) {
      const username = users.get(key);
      if (username !== undefined) {
        const sumWon = calculateWinnings(gameData.winningNumber, chipsPlaced);
        wins.push({ username, sum: sumWon });
      }
    }
  };

  function handleWinnersStage() {
    console.log("Winners");
    gameData.stage = GameStages.WINNERS;

    if (!gameData.history) {
      gameData.history = [];
    }
    gameData.history.push(gameData.winningNumber);

    if (gameData.history.length > 10) {
      gameData.history.shift();
    }

    gameData.wins = wins.sort((a, b) => b.sum - a.sum);
    sendStageEvent(gameData);
  };

  // Utility Functions
  function getRandomNumberInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function sendStageEvent(data: GameData) {
    const json = JSON.stringify(data);
    io.emit("stage-change", json);
  };

  io.on("connection", (socket) => {
    socket.on("enter", (username: string) => {
      if (users.size === 0) {
        timer.start({ precision: "seconds" });
      }
      users.set(socket.id, username);
      sendStageEvent(gameData);
    });

    socket.on("place-bet", (data: string) => {
      try {
        const placedChips = JSON.parse(data) as PlacedChip[];
        usersData.set(socket.id, placedChips);
      } catch (error) {
        console.error(`Error parsing placed chips data from user ${socket.id}:`, error);
      }
    });

    socket.on('send-message', ({ username, message }) => {
      console.log('message received:', username, message);
      // Broadcast the message to all other clients
      socket.broadcast.emit('receive-message', { username, message });
    });

    socket.on("disconnect", (reason) => {
      console.log(`User ${users.get(socket.id)} disconnected: ${reason}`);
      if (users.size === 1) {
        timer.stop();
      }
      users.delete(socket.id);
      usersData.delete(socket.id);
      gameData = {} as GameData;
    });
  });

  function calculateWinnings(winningNumber: number, placedChips: PlacedChip[]) {
    let win = 0;
    const arrayLength = placedChips.length;

    for (let i = 0; i < arrayLength; i++) {
      const { item: { type: placedChipType, value: placedChipValue }, sum: placedChipSum } = placedChips[i];

      switch (placedChipType) {
        case ValueType.NUMBER:
          if (placedChipValue === winningNumber) {
            win += placedChipSum * 36;
          }
          break;

        case ValueType.BLACK:
          if (BLACK_NUMBERS.includes(winningNumber)) {
            win += placedChipSum * 2;
          }
          break;

        case ValueType.RED:
          if (RED_NUMBERS.includes(winningNumber)) {
            win += placedChipSum * 2;
          }
          break;

        case ValueType.NUMBERS_1_18:
          if (winningNumber >= 1 && winningNumber <= 18) {
            win += placedChipSum * 2;
          }
          break;

        case ValueType.NUMBERS_19_36:
          if (winningNumber >= 19 && winningNumber <= 36) {
            win += placedChipSum * 2;
          }
          break;

        case ValueType.NUMBERS_1_12:
          if (winningNumber >= 1 && winningNumber <= 12) {
            win += placedChipSum * 3;
          }
          break;

        case ValueType.NUMBERS_2_12:
          if (winningNumber >= 13 && winningNumber <= 24) {
            win += placedChipSum * 3;
          }
          break;

        case ValueType.NUMBERS_3_12:
          if (winningNumber >= 25 && winningNumber <= 36) {
            win += placedChipSum * 3;
          }
          break;

        case ValueType.EVEN:
          if (winningNumber % 2 === 0) {
            win += placedChipSum * 2;
          }
          break;

        case ValueType.ODD:
          if (winningNumber % 2 !== 0) {
            win += placedChipSum * 2;
          }
          break;

        default:
          break;
      }
    }

    return win;
  };
}

export default setupGame;