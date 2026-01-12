CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,           -- Unique ID that auto-increments
    title VARCHAR(255) NOT NULL,     -- Name of the show/book
    type VARCHAR(50) NOT NULL,      -- 'Anime', 'Manga', 'Movie', etc.
    status VARCHAR(50) DEFAULT 'Plan to Watch', -- Current progress
    current_progress INT DEFAULT 0,  -- Episode or Chapter number
    total_episodes INT,              -- Optional: Total count
    rating INT CHECK (rating >= 0 AND rating <= 10), -- 1-10 scale
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);