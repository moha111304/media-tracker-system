# Media Tracker System
Full-stack application to track Manga, Anime, and Light/Web Novels.

## Recent Milestones
* **Defensive Backend:** Implemented strict server-side validation and "Fail-Fast" logic to ensure database integrity.
* **Dynamic Query Engine:** Developed an intelligent GET route that builds SQL queries on the fly for advanced filtering (e.g., searching by type or status).
* **Browser Integration:** Launched a Manifest V3 Chrome Extension that bridges the PostgreSQL database directly into the browser UI via asynchronous fetch logic.
* **Database Scaling:** Seeded the system with professional-grade test data to ensure UI responsiveness.

## Roadmap
- [ ] **Week 2, Day 4:** Implement a "Search & Filter" bar within the Chrome Extension.
- [ ] **Week 2, Day 5:** Add "Delete" functionality with a confirmation modal.
- [ ] **Future:** User Authentication (BCrypt/JWT) to allow multiple users.
- [ ] **Future:** Syncing with external APIs (MyAnimeList/AniList) to auto-fill metadata.

## Search & Filtering Review
The system implements a **Live Search** feature using a "Debounced" frontend and a dynamic SQL backend.

### Frontend: The Debounce
To prevent overwhelming the PostgreSQL database with a request for every keystroke, I implemented a **300ms debounce**. This ensures that the `popup()` function only fires after the user has stopped typing.

### Backend: Dynamic SQL Construction
The `GET /media` endpoint builds its query string based on provided parameters. For the search feature, I used the **`ILIKE`** operator combined with **SQL Wildcards (`%`)**:
- **ILIKE:** Allows for case-insensitive matching (e.g., "vin" matches "Vinland").
- **% Wildcard:** Wraps the search term (e.g., `%title%`) to find the keyword anywhere within the string.

### URL Persistence
Using `URLSearchParams`, the extension handles spaces and special characters automatically through percent-encoding, ensuring that statuses like "Plan To Watch" are transmitted safely to the Express server.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript (Strict Mode)
- **Database:** PostgreSQL (with connection pooling)
- **Frontend:** Chrome Extension (Vanilla JS, CSS3, HTML5)
- **Tools:** DBeaver (Database management), Git (Version control)

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