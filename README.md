# Media Tracker System
Full-stack application to track Manga, Anime, and Light/Web Novels.

## Key Milestones
* **Backend Foundation:** Built a high-performance Express.js server using TypeScript for strict type-checking.
* **Database Design:** Architected a relational schema in PostgreSQL to manage media metadata and user progress.
* **Data Persistence:** Implemented a persistent "Bridge" using connection pooling for efficient database queries.
* **RESTful API:** Developed initial endpoints to fetch and synchronize media data between the server and the database.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **Frontend:** React, Tailwind CSS
- **Extension:** JavaScript (Manifest v3)

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