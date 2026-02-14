# Media Tracker - Development Tasks

## High Priority (Back-end)
- [ ] Run `database/schema.sql` to add `image_url` column to PostgreSQL.
- [ ] Update `POST /media` route in Express to accept `image_url` from the frontend.
- [ ] Create `GET /api/stats` endpoint for the new Analytics page.

## Medium Priority (Front-end)
- [ ] Link the "Login" form to a (future) authentication service.
- [ ] Implement JavaScript `fetch()` on the Analytics page to populate stats cards.
- [ ] Add a "Search" bar to the main Tracker gallery.

## Low Priority (Polish)
- [ ] Add transition animations to the Gallery Cards in `main.css`.
- [ ] Create a "Not Found" 404 page for broken routes.