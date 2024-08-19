import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  Grid,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Minimize';

import { BASE_URL } from "../constants";
import {
  StyledChat,
  StyledChatContent,
  StyledChatHistory,
  StyledChatHistoryList,
} from "./styles";
import { Howl } from "howler";

// Set up the sound effect
const newMessageSound = new Howl({
  src: ["/sounds/new-message.mp3"],
  volume: 0.5,
});

const socket = io(BASE_URL);

interface Props {
  username: string;
}

interface Message {
  username: string;
  message: string;
}

const Chat: React.FC<Props> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // State to control popover
  const open = Boolean(anchorEl);

  useEffect(() => {
    socket.on('receive-message', ({ username, message }) => {
      // Play sound when a new message is received
      newMessageSound.play();
      setMessages((prevMessages) => [...prevMessages, { username, message }]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('send-message', { username, message: newMessage });
      setMessages((prevMessages) => [...prevMessages, { username, message: newMessage }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledChat>
      <IconButton
        color="primary"
        onClick={handleClick}
      >
        <ChatIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxWidth: '30rem',
            maxHeight: '25rem'
          },
        }}
      >
        <StyledChatContent
          container
          spacing={2}
        >
          <Grid item xs={12} container
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Conversation
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <MinimizeIcon />
            </IconButton>
          </Grid>
          <StyledChatHistory container item direction="row">
            <StyledChatHistoryList>
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${msg.username}: ${msg.message}`}
                  />
                </ListItem>
              ))}
            </StyledChatHistoryList>
          </StyledChatHistory>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              onKeyPress={handleKeyPress}
            />
          </Grid>
        </StyledChatContent>
      </Popover>
    </StyledChat>
  );
};

export default Chat;
