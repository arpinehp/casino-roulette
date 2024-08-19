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