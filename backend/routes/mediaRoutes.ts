import { Router } from 'express';
import { adminOnly } from '../middleware/authMiddleware';
// Import your DB controller here
// import { getMedia, addMedia, updateMedia, deleteMedia } from '../controllers/mediaController';

const router = Router();

/**
 * Media Management Routes
 * Maps frontend fetch calls to backend database logic.
 */

// Public/User Routes
router.get('/', async (req, res) => {
    // Logic to fetch all media from PostgreSQL
    res.json({ message: "Fetching all media entries..." });
});

router.post('/', async (req, res) => {
    // Logic to insert new media (Anime/Manhwa)
    res.status(201).json({ message: "Media added successfully" });
});

router.patch('/:id', async (req, res) => {
    // Logic to update episode progress
    res.json({ message: `Updating media ID ${req.params.id}` });
});

// Protected Admin Routes
router.delete('/:id', adminOnly, async (req, res) => {
    res.json({ message: `Media ID ${req.params.id} deleted by admin` });
});

export default router;