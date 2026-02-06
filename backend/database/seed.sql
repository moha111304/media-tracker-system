-- Seed Data for Media Tracker (v2.0)
-- This file populates the database with sample data for development and UI testing.

INSERT INTO media_items (title, media_type, tracking_status, current_progress, total_episodes, rating, image_url)
VALUES 
('Solo Leveling', 'Anime', 'Watching', 7, 12, 9, 'https://cdn.myanimelist.net/images/anime/1090/139082.jpg'),
('The Beginning After The End', 'Manhwa', 'Reading', 175, 175, 10, 'https://cdn.myanimelist.net/images/manga/2/236021.jpg'),
('Vinland Saga', 'Anime', 'Completed', 24, 24, 9, 'https://cdn.myanimelist.net/images/anime/1500/103005.jpg'),
('Omniscient Reader', 'Manhwa', 'Reading', 190, 200, 10, 'https://cdn.myanimelist.net/images/manga/3/240561.jpg'),
('Frieren: Beyond Journey''s End', 'Anime', 'Watching', 20, 28, 10, 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg'),
('Dune: Part Two', 'Movie', 'Completed', 1, 1, 9, 'https://m.media-amazon.com/images/M/MV5BN2JmZTk2OTgtOTRiOC00MTM3LTliOTQtY2VkNWMxOWZlY2FjXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_.jpg'),
('The Way of Kings', 'Novel', 'Reading', 400, 1000, 10, 'https://m.media-amazon.com/images/I/51B8HIn6n9L.jpg'),
('Haikyuu!!', 'Anime', 'Completed', 25, 25, 8, 'https://cdn.myanimelist.net/images/anime/7/76014.jpg');