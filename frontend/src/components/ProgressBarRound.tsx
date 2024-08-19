import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

import { GameStages } from "../types";
import { StyledProgressBar, ProgressRoundTitle } from './styles';

interface Props {
  stage : GameStages;
  maxDuration: number;
}

const INTERVAL = 200;

const ProgressBarRound: React.FC<Props> = ({ stage, maxDuration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!maxDuration) return;
    const diff = 100 / ((maxDuration * 1000) / INTERVAL);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress + diff, 100);
      });
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [stage, maxDuration]);

  return (
    <StyledProgressBar>
      <ProgressRoundTitle>
        {
          (stage === GameStages.PLACE_BET) ? "PLACE BET"
          : (stage === GameStages.WINNERS)  ? " WINNERS"
          : "NO MORE BETS"
        }
      </ProgressRoundTitle>
      <LinearProgress variant="determinate" value={progress} />
    </StyledProgressBar>
  );
};

export default ProgressBarRound;
