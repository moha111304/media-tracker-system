import pool from './db';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware (Like Java Filters)
app.use(cors()); // Allows your extension/frontend to talk to the server
app.use(express.json()); // Allows the server to read JSON data


// GET (Read) Routes

// First "Route"
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: "success", message: "Media Tracker API is online!" });
});

// New Test Route for the Database
app.get('/test-db', async (req: Request, res: Response) => {
  try {
    // This asks the database for the current time
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: "success", 
      message: "Database is connected!", 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
});

// Route to get all media items from the database
app.get('/media', async (req: Request, res: Response) => {
  try {
    // We use the pool to send a raw SQL query
    const result = await pool.query('SELECT * FROM media_items ORDER BY created_at DESC');
    
    // result.rows is an array of objects representing your database rows
    res.json(result.rows); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch media items" });
  }
});

app.get('/hello/:name', async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    res.json({
      status: "success",
      message: `Hello, ${name}!`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// POST (Create) routes

app.post('/media', async (req: Request, res: Response) => {
  try{
    const { title, media_type, tracking_status, current_progress } = req.body;

    const sql = `
      INSERT INTO media_items (title, media_type, tracking_status, current_progress)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(sql, [title, media_type, tracking_status, current_progress]);
    
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
})

// DELETE routes

app.delete('/media/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const sql = `
      DELETE FROM media_items WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ status: "error", message: "Not Found"});
    } else {
      res.status(200).json(result.rows[0]);
    }

  } catch (err){
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error"})
  }
});

// PUT (Update) Routes

app.put('/media/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { current_progress, tracking_status } = req.body;

    const sql = `
      UPDATE media_items 
      SET current_progress = $1, tracking_status = $2 
      WHERE id = $3 
      RETURNING *;
    `;

    const result = await pool.query(sql, [current_progress, tracking_status, id]);

    if (result.rowCount === 0) {
      res.status(404).json({ status: "error", message: "Not Found"});
    } else {
      res.status(200).json(result.rows[0]);
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error"})
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});