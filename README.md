# Media Tracker System
A full-stack tracking application for Anime, Manga, and Novels, featuring a custom Chrome Extension interface and a robust TypeScript/PostgreSQL backend.

## Features
- **Full CRUD Support:** Add, view, update progress, and delete media items directly from your browser.
- **Live Search:** Case-insensitive title search powered by SQL `ILIKE`.
- **Intelligent Filtering:** Filter by media type or tracking status with dynamic query building.
- **Performance Optimized:** Frontend debouncing (300ms) to reduce server load and SQL connection pooling for efficient data persistence.
- **Safety First:** Server-side validation and frontend confirmation modals for destructive actions.

## Architectural Highlights

- **Manifest V3 Browser Integration:** Engineered a custom Chrome Extension frontend to allow seamless data entry and tracking without leaving the active browser tab.
- **Dynamic Query Construction:** Developed a flexible backend filtering engine using **SQL ILIKE** and wildcards, enabling real-time, case-insensitive title searches.
- **Traffic Optimization:** Implemented a **300ms debounce** on frontend inputs, reducing redundant API overhead and server-side processing by ensuring queries only fire upon input pauses.
- **Relational Data Integrity:** Utilized PostgreSQL check constraints and strict TypeScript interfaces to maintain data consistency across the full CRUD lifecycle.
- **State Persistence:** Integrated `chrome.storage.local` to maintain user filter and search states across browser sessions.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript (Strict Mode)
- **Database:** PostgreSQL (with Connection Pooling)
- **Frontend**: Responsive HTML5, CSS Grid gallery, and Vanilla JavaScript.
- **Extension:** Chrome Extension API (Vanilla JS, CSS3, HTML5)
- **Tooling:** DBeaver (Database Design), Git (Version Control)

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
├── frontend/          # Static assets
│   ├── css/           # Global styles and responsive design
│   └── html/          # Core page structures (index, tracker, login)
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

### Roadmap & Evolution
[x] v1.0 Core: Full CRUD lifecycle implementation and SQL-backed search.
[X] v1.1 UX: Modal-driven entry forms and auto-focus logic.
[ ] v2.0 Security: User Authentication via JWT/BCrypt.
[ ] v2.1 Integration: Metadata auto-sync with external APIs (MyAnimeList/AniList).

### Setup
1. **Database:** Initialize the schema found in backend/database/schema.sql within your PostgreSQL instance.
2. **Backend:**
   - cd backend && npm install
   - Configure .env with your DATABASE_URL and PORT.
   - npm run dev to start the TypeScript development server.
3. **Extension:**
   - Navigate to chrome://extensions/
   - Enable Developer Mode.
   - Select Load Unpacked and point to the /extension directory.