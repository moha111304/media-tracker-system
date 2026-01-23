import pool from './db';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const ALLOWED_MEDIA_TYPES = [
  'Anime', 'Donghua', 'Manga', 'Manhwa', 'Manhua', 'Light Novel', 'Web Novel',
   'Book', 'Novel', 'Movie', 'Tv Show'
  ];

const ALLOWED_STATUSES = [
  'Plan To Watch', 'Watching', 'Plan To Read', 'Reading', 'Completed', 'Dropped', 'On Hold', 'Hiatus'
];

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
    const { media_type, tracking_status, title } = req.query;
    
    let sql = 'SELECT * FROM media_items';
    const conditions = []; // To store strings like "media_type = $1"
    const params = [];     // To store the actual values

    // 1. Build the conditions dynamically
    if (media_type) {
      params.push(media_type);
      conditions.push(`media_type = $${params.length}`);
    }

    if (tracking_status) {
      params.push(tracking_status);
      conditions.push(`tracking_status = $${params.length}`);
    }

    if (title) {
      params.push(`%${title}%`); // The % wildcards allow partial matches
      // Use ILIKE for case-insensitive partial searching
      conditions.push(`title ILIKE $${params.length}`);
    }

    // 2. If we have conditions, join them with 'WHERE' and 'AND'
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC, id ASC';

    const result = await pool.query(sql, params);
    // result.rows is an array of objects representing database rows
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
    const total_episodes = req.body.total_episodes || 0;

    const { title, media_type, tracking_status, current_progress, rating } = req.body;

    // Trimmed version to use for validation AND SQL query
    const trimmedTitle = title ? title.trim() : "";

    // Validation For Inputs
    if (trimmedTitle === "") {
      return res.status(400).json({ 
        error: "Validation Error", 
        message: "Title is required" 
      });
    }

    if (!media_type || !ALLOWED_MEDIA_TYPES.includes(media_type)) {
      return res.status(400).json({ 
        error: "Validation Error",
        message:`Invalid or missing media type. Must be one of: ${ALLOWED_MEDIA_TYPES.join(', ')}` 
      });
    }

    if (!tracking_status || !ALLOWED_STATUSES.includes(tracking_status)) {
      return res.status(400).json({ 
        error: "Validation Error",
        message:`Invalid or missing status. Must be one of: ${ALLOWED_STATUSES.join(', ')}` 
      });
    }

    if (current_progress < 0) {
      return res.status(400).json({ 
        error:"Validation Error",
        message: "Progress cannot be negative" 
      }) ;
    }

    if (current_progress > total_episodes && total_episodes !== 0) {
      return res.status(400).json({ 
        error: "Validation Error", 
        message: `Progress (${current_progress}) cannot exceed total episodes (${total_episodes}).` 
      });
    }

    if (rating !== null && (rating < 0 || rating > 10)) {
      return res.status(400).json({ 
        error: "Validation Error",
        message: "Rating must be between 0 and 10" 
      });
    }

    let finalStatus = tracking_status;
    let finalProgress = current_progress;

    // If progress meets or exceeds total, force "Completed"
    if (total_episodes > 0 && finalProgress >= total_episodes) {
        finalStatus = 'Completed';
        finalProgress = total_episodes; // Caps progress at the max
    }

    // If user manually selects "Completed", ensure progress is maxed out
    if (finalStatus === 'Completed' && total_episodes > 0) {
        finalProgress = total_episodes;
    }


    const sql = `
      INSERT INTO media_items (title, media_type, tracking_status, current_progress, total_episodes, rating)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const result = await pool.query(sql, [trimmedTitle, media_type, finalStatus, finalProgress, total_episodes, rating]);
    
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
    const total_episodes = req.body.total_episodes || 0;
    const { tracking_status, current_progress } = req.body;
    
    // Validation For Updates
    if (tracking_status && !ALLOWED_STATUSES.includes(tracking_status)) {
      return res.status(400).json({ 
        error: "Validation Error",
        message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}` 
      });
    }

    if (current_progress < 0) {
      return res.status(400).json({ 
        error: "Validation Error",
        message: "Progress cannot be negative" 
      });
    }

    if (current_progress > total_episodes && total_episodes !== 0) {
      return res.status(400).json({ 
        error: "Validation Error", 
        message: `Progress (${current_progress}) cannot exceed total episodes (${total_episodes}).` 
      });
    }

    let finalStatus = tracking_status;
    let finalProgress = current_progress;

    // If progress meets or exceeds total, force "Completed"
    if (total_episodes > 0 && finalProgress >= total_episodes) {
        finalStatus = 'Completed';
        finalProgress = total_episodes; // Caps progress at the max
    }

    // If user manually selects "Completed", ensure progress is maxed out
    if (finalStatus === 'Completed' && total_episodes > 0) {
        finalProgress = total_episodes;
    }

    const sql = `
      UPDATE media_items 
      SET tracking_status = $1, current_progress = $2, total_episodes = $3
      WHERE id = $4 
      RETURNING *;
    `;

    const result = await pool.query(sql, [finalStatus, finalProgress, total_episodes, id]);

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
  console.log(`Server is running on http://localhost:${PORT}`);
});