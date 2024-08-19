import anime from "animejs";
import React, { useEffect, useRef, useCallback } from "react";
import { rouletteData } from "../types";

interface WheelProps {
  rouletteData: rouletteData;
  winningNumber: number | null;
}

const totalNumbers = 37;
const singleSpinDuration = 5000;
const singleRotationDegree = 360 / totalNumbers;

const getRouletteIndexFromNumber = (num: number, rouletteWheelNumbers: number[]): number => {
  return rouletteWheelNumbers.indexOf(num);
};

const getRotationFromNumber = (num: number, rouletteWheelNumbers: number[]): number => {
  const index = getRouletteIndexFromNumber(num, rouletteWheelNumbers);
  return singleRotationDegree * index;
};

const getRandomEndRotation = (minSpins: number, maxSpins: number): number => {
  const rotateTo = anime.random(minSpins * totalNumbers, maxSpins * totalNumbers);
  return singleRotationDegree * rotateTo;
};

const getZeroEndRotation = (totalRotation: number): number => {
  return 360 - Math.abs(totalRotation % 360);
};

const getBallEndRotation = (zeroEndRotation: number, currentNumber: number, rouletteWheelNumbers: number[]): number => {
  return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber, rouletteWheelNumbers);
};

const getBallNumberOfRotations = (minSpins: number, maxSpins: number): number => {
  const numberOfSpins = anime.random(minSpins, maxSpins);
  return 360 * numberOfSpins;
};

const Wheel: React.FC<WheelProps> = ({ rouletteData: { numbers: rouletteWheelNumbers }, winningNumber }) => {
  const lastNumberRef = useRef<number>(0);

  const spinWheel = useCallback((nextNumber: number): void => {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const ballMinSpins = 2;
    const ballMaxSpins = 4;
    const wheelMinSpins = 2;
    const wheelMaxSpins = 4;

    const lastNumberRotation = getRotationFromNumber(lastNumberRef.current, rouletteWheelNumbers);
    const endRotation = -getRandomEndRotation(ballMinSpins, ballMaxSpins);
    const zeroFromEndRotation = getZeroEndRotation(endRotation);
    const ballEndRotation = getBallNumberOfRotations(wheelMinSpins, wheelMaxSpins) + getBallEndRotation(zeroFromEndRotation, nextNumber, rouletteWheelNumbers);

    anime.set([".layer-2", ".layer-4"], {
      rotate: lastNumberRotation,
    });

    anime.set(".ball-container", {
      rotate: 0,
    });

    anime({
      targets: [".layer-2", ".layer-4"],
      rotate: endRotation,
      duration: singleSpinDuration,
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: () => {
        lastNumberRef.current = nextNumber;
      },
    });

    anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 20, duration: 1000 },
        { value: 25, duration: 900 },
        { value: 50, duration: 1000 },
      ],
      rotate: [{ value: ballEndRotation, duration: singleSpinDuration }],
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`,
    });
  }, [rouletteWheelNumbers]);

  useEffect(() => {
    if (winningNumber != null) {
      spinWheel(winningNumber);
    }
  }, [winningNumber, spinWheel]);

  return (
    <div className="roulette-wheel">
      <div className="layer-2 wheel" style={{ transform: "rotate(0deg)" }}></div>
      <div className="layer-3"></div>
      <div className="layer-4 wheel" style={{ transform: "rotate(0deg)" }}></div>
      <div className="layer-5"></div>
      <div className="ball-container" style={{ transform: "rotate(0deg)" }}>
        <div className="ball" style={{ transform: "translate(0, -163.221px)" }}></div>
      </div>
    </div>
  );
};

export default Wheel;
