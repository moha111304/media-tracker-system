import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware (Like Java Filters)
app.use(cors()); // Allows your extension/frontend to talk to the server
app.use(express.json()); // Allows the server to read JSON data

// Your first "Route"
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: "success", message: "Media Tracker API is online!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});