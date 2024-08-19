# Casino Roulette

## Overview

Casino Roulette is a web application that simulates a casino-style roulette game. This application is built using ReactJS, styled with Styled-Components, and communicates with a server using Socket.IO.

## Introduction

### Development Environment Setup - Download and Stand Up the Application
### Step 1: Download the Repository
Clone the repository from GitHub and navigate into the project directory:

```bash
git clone https://github.com/casino-roulette/casino-roulette.git
cd casino-roulette
```

### Step 2: Install dependencies
```bash
cd backend
npm install

cd frontend
npm install
```

### Step 3: Run application

```bash
# Run back-end
cd backend
npm run devstart

# Run front-end
cd frontend
npm run devstart
```


### Step 4: Run in docker
```bash
docker build -t casino-roulette:0.1.0 .

docker run -p 8000:8000 casino-roulette:0.1.0
```

# Project Features and Status

## Multiplayer Mode
- **Status:** ✅ Implemented
- Two players can join the same game session and view each other's winnings.
- **To-Do:** See each other's bets.

## Dynamic Odds Calculation
- **Status:** ✅ Implemented

## Betting History & Analytics Dashboard
- **Status:** 🟡 Partially Implemented
- Players can view their betting history.
- **To-Do:** Develop the analytics dashboard.

## Real-Time Chat
- **Status:** ✅ Implemented
- Players can chat with each other during the game using a real-time chat feature.

## Authentication & Player Profiles
- **Status:** 🟡 Partially Implemented
- User authentication has been implemented.
- **To-Do:** Profile management is still pending.

## Leaderboards
- **Status:** ⬜️ To-Do
- **To-Do:** Implement leaderboards to rank players.

## Sound Effects & Animations
- **Status:** ✅ Implemented
- Sound effects and animations have been added for various game actions.

## Responsive Design & Mobile Support
- **Status:** 🟡 Partially Implemented
- The game works seamlessly on desktop devices.
- **To-Do:** Improve support and responsiveness for mobile devices.

## Dark/Light Mode
- **Status:** ⬜️ To-Do
- **To-Do:** Add theme support for dark and light modes.

## AI Opponent
- **Status:** ⬜️ To-Do
- **To-Do:** Provide an AI opponent for single-player mode.

## Currency Management & Virtual Wallet
- **Status:** ⬜️ To-Do
- **To-Do:** Implement a virtual currency system and wallet for players.

## Daily/Weekly Challenges
- **Status:** ⬜️ To-Do
- **To-Do:** Offer daily and weekly challenges for players to earn rewards.
