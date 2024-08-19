import { createServer } from "http";
import app from './app';
import setupGame from './game';

// Create the HTTP server using the Express app
const server = createServer(app);

// Set up Socket.IO with the server
setupGame(server);

// Start the server on port 3000
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
