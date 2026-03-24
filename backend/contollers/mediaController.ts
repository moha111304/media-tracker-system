import { Request, Response } from 'express';
// import pool from '../config/db'; // We'll set this up next!

/**
 * Media Controller
 * Encapsulates all database logic for the Tracker.
 */

export const getAllMedia = async (req: Request, res: Response) => {
    try {
        // Logic: const result = await pool.query('SELECT * FROM media');
        res.json({ message: "GET request successful: Ready for SQL" });
    } catch (error) {
        res.status(500).json({ error: "Database fetch failed" });
    }
};

export const addMedia = async (req: Request, res: Response) => {
    const { title, media_type, total_episodes } = req.body;
    try {
        // Logic: INSERT INTO media (title, type, episodes) VALUES ($1, $2, $3)
        res.status(201).json({ message: `Added ${title} to database` });
    } catch (error) {
        res.status(500).json({ error: "Failed to save media" });
    }
};

export const deleteMedia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Logic: DELETE FROM media WHERE id = $1
        res.json({ message: `Deleted entry #${id}` });
    } catch (error) {
        res.status(500).json({ error: "Delete operation failed" });
    }
};