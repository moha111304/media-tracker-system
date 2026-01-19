# Media Tracker System
A full-stack tracking application for Anime, Manga, and Novels, featuring a custom Chrome Extension interface and a robust TypeScript/PostgreSQL backend.

## Features
- **Full CRUD Support:** Add, view, update progress, and delete media items directly from your browser.
- **Live Search:** Case-insensitive title search powered by SQL `ILIKE`.
- **Intelligent Filtering:** Filter by media type or tracking status with dynamic query building.
- **Performance Optimized:** Frontend debouncing (300ms) to reduce server load and SQL connection pooling for efficient data persistence.
- **Safety First:** Server-side validation and frontend confirmation modals for destructive actions.

## 🛠 Tech Stack
- **Backend:** Node.js, Express, TypeScript (Strict Mode)
- **Database:** PostgreSQL (Relation schema with check constraints)
- **Frontend:** Chrome Extension (Manifest V3, Vanilla JS, CSS3)
- **Tools:** DBeaver, Thunder Client, Gitss.

## Roadmap
- [X] **Week 2, Day 4:** Implement a "Search & Filter" bar within the Chrome Extension.
- [X] **Week 2, Day 5:** Add "Delete" functionality with a confirmation modal.
- [X] **Future:** User Authentication (BCrypt/JWT) to allow multiple users.
- [X] **Future:** Syncing with external APIs (MyAnimeList/AniList) to auto-fill metadata.

## Project Structure

```text
media-tracker-system/
├── backend/
|   ├── database
│   │   └── schema.sql # Core Data Model
│   ├── src/
│   │   ├── index.ts   # Entry point & API routes
│   │   └── db.ts      # Database connection & pooling
│   ├── .env           # Environment variables (Local only)
│   └── package.json   # Backend dependencies
├── extension/         # Chrome Extension Files
│   ├── manifest.json  # Extension metadata & permissions
│   ├── popup.html     # Extension UI
│   └── popup.js       # API Fetching & DOM Rendering
├── README.md          # Project documentation
└── .gitignore         # Safety filter for GitHub
```

## Data Model

The `media_items` table stores the core data for the tracker:
* **Identification:** `id` (Primary Key, Serial)
* **Metadata:** `title`, `media_type` (Anime/Manga/Movie/etc...), `total_episodes`
* **User Progress:** `tracking_status`, `current_progress`, `rating` (1-10)
* **Timestamps:** `created_at`

### Prerequisites
* Node.js (v18+)
* PostgreSQL
* Postgres.app (for Mac users)

### Setup
1. **Install dependencies:** `npm install`
2. **Environment Variables:** Create a `.env` file in the backend folder and add:
   - `PORT=5001`
   - `DATABASE_URL=postgres://yourname@localhost:5432/media_tracker`
3. **Database Initialization:** Run the schema found in the database scripts (coming soon) in DBeaver.
4. **Start Development Server:** `npm run dev`