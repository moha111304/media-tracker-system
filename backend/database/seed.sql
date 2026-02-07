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
('Haikyuu!!', 'Anime', 'Completed', 25, 25, 8, 'https://cdn.myanimelist.net/images/anime/7/76014.jpg'),
('Jujutsu Kaisen', 'Anime', 'Watching', 12, 24, 9, 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg'),
('Berserk', 'Manga', 'Reading', 120, 380, 10, 'https://cdn.myanimelist.net/images/manga/1/157897.jpg'),
('Cyberpunk: Edgerunners', 'Anime', 'Completed', 10, 10, 9, 'https://cdn.myanimelist.net/images/anime/1815/126435.jpg'),
('Arcane', 'Tv Show', 'Completed', 9, 9, 10, 'https://m.media-amazon.com/images/M/MV5BYmU5YWE4NTUtODE0Mi00MGE4LWEzYzYtMzU4MzE1YjcyZWYyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg'),
('Monster', 'Anime', 'On Hold', 35, 74, 9, 'https://cdn.myanimelist.net/images/anime/10/18793.jpg'),
('Chainsaw Man', 'Manga', 'Reading', 95, 150, 8, 'https://cdn.myanimelist.net/images/manga/3/216464.jpg'),
('Better Call Saul', 'Tv Show', 'Completed', 63, 63, 10, 'https://m.media-amazon.com/images/M/MV5BZDA4YmE2OTYtNWUyOS00MzVkLTgwM2EtMDI2Nzk4MzNkMGEwXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg'),
('Shadow Slave', 'Web Novel', 'Reading', 800, 1600, 9, 'https://images.squarespace-cdn.com/content/v1/6466986685f061266e744654/1684534444589-M6L7EOWD9A9W9N2O9A9W/Shadow+Slave+Cover.jpg');