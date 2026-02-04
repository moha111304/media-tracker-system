-- Media Tracker Database Schema (v2.0)

-- Drop table if exists (Useful for clean resets during development)
-- DROP TABLE IF EXISTS media_items;

CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,           -- Unique ID that auto-increments
    title VARCHAR(255) NOT NULL,     -- Name of the show/book
    media_type VARCHAR(50) NOT NULL, -- 'Anime', 'Manga', 'TV Show'
    tracking_status VARCHAR(50) DEFAULT 'Plan to Read', -- Current progress
    current_progress INT DEFAULT 0,  -- Episode or Chapter number
    total_episodes INT DEFAULT 0,    -- Optional: Total count
    rating NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10.0), -- 1-10 scale
    image_url TEXT,                  -- Added for v2.0 Gallery View
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster searching by title
CREATE INDEX idx_media_title ON media_items(title);