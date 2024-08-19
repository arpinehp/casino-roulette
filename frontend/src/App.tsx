import React, { useState } from "react";
import Button from '@mui/material/Button';

import GameBoard from "./pages/GameBoard";
import { AuthUser, UserName } from "./styles";
import "./styles.css";

function App() {
  const [stringValue, setStringValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");

  const handleOnClick = () => {
    if (stringValue.length > 5) {
      setUsernameValue(stringValue)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  };

  if (usernameValue === "") {
    return (
      <AuthUser>
        <UserName
          placeholder="Your nickname"
          value={stringValue}
          onChange={(event) => setStringValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          onClick={handleOnClick}>
          Login
        </Button>
      </AuthUser>
    );
  } else {
    return (
      <div>
        <GameBoard username={usernameValue}/>
      </div>
    );
  }
};
export default App;
