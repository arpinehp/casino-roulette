import express, { Response } from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

// Route for the home page
app.get('/', (_, res: Response) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

// Serve static files from the "public" directory
app.use(express.static(path.resolve('../frontend/build/')));

export default app;
