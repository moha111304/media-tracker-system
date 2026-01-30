import path from 'path';
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
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// --- MEDIA SECTION ---

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
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error"})
  }
})

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


// --- AUTHENTICATION ROUTES ---
// These will eventually use JWT (JSON Web Tokens) or Sessions

// POST: Sign Up a new user
app.post('/auth/signup', async (req: Request, res: Response) => {
  // TODO: Hash password using bcrypt
  // TODO: Save user to "users" table
  res.status(201).json({ 
    status: "success", 
    message: "User account created. Please log in." 
  });
});

// POST: Login existing user
app.post('/auth/login', async (req: Request, res: Response) => {
  // TODO: Compare request password with hashed DB password
  // TODO: Generate and return a JWT token
  res.json({ 
    status: "success", 
    message: "Login successful", 
    token: "mock-jwt-token-xyz" 
  });
});


// --- USER PROFILE ROUTES ---

// GET: Current user's info
app.get('/user/profile', (req: Request, res: Response) => {
  // TODO: Extract user ID from JWT token
  res.json({ 
    status: "success", 
    data: { username: "Random", email: "student@umn.edu" } 
  });
});


// --- DASHBOARD / HOME ROUTES ---

// GET: Landing page or API root
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

// GET: Aggregated stats for the dashboard
app.get('/media/stats', async (req: Request, res: Response) => {
  // TODO: Run SQL like 'SELECT COUNT(*) FROM media_items GROUP BY tracking_status'
  res.json({ 
    status: "success", 
    stats: {
      total_items: 42,
      completed: 15,
      currently_watching: 5
    }
  });
});


// --- ADVANCED ANALYTICS & SOCIAL ---

// GET: A "Social" feed of recent global activity
app.get('/media/discover', (req: Request, res: Response) => {
  // TODO: SELECT * FROM media_items WHERE is_public = true ORDER BY created_at DESC LIMIT 10
  res.json({ 
    status: "success", 
    message: "Fetching recent global activity...",
    data: [] 
  });
});

// GET: Deep breakdown of user habits
app.get('/media/analytics', (req: Request, res: Response) => {
  // TODO: Use SQL 'SUM' and 'AVG' to calculate time spent and genre percentages
  res.json({ 
    status: "success", 
    message: "Analytics engine ready",
    data: {
      most_watched_genre: "Shonen",
      estimated_hours_spent: 124.5
    }
  });
});


// --- EXTERNAL INTEGRATIONS ---

// GET: Proxy to fetch data from MyAnimeList/Jikan or AniList
app.get('/external/search', async (req: Request, res: Response) => {
  const { query } = req.query;
  // TODO: Use 'axios' or 'fetch' to call Jikan API: https://api.jikan.moe/v4/anime?q=...
  res.json({ 
    status: "success", 
    message: `Ready to search for: ${query}`,
    results: [] 
  });
});


// --- SYSTEM / BULK ACTIONS ---

// PATCH: Update multiple items at once
app.patch('/media/bulk-update', (req: Request, res: Response) => {
  // TODO: Expect an array of IDs in the body and a status to change them to
  res.json({ 
    status: "success", 
    message: "Bulk update received" 
  });
});

// GET: Export all user data (for backup)
app.get('/user/export', (req: Request, res: Response) => {
  // TODO: Convert media_items table to a CSV or JSON file download
  res.json({ 
    status: "success", 
    message: "Preparing data export..." 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});