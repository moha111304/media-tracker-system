/**
 * Tracker Data Orchestrator
 * Connects the API service to the UI Renderer.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterSelect = document.getElementById('media-filter');

    /**
     * Main function to fetch and display media
     */
    const loadMediaEntries = async (filter = 'All') => {
        try {
            console.log(`Fetching ${filter} media...`);
            
            // 1. Fetch data from our API Service
            // Endpoint matches your Express router logic
            const mediaData = await api.get('/media');

            // 2. Filter data based on UI selection
            const filteredData = filter === 'All' 
                ? mediaData 
                : mediaData.filter(item => item.media_type === filter);

            // 3. Pass the data to the Renderer to update the DOM
            Renderer.renderGallery('gallery-grid', filteredData);

        } catch (error) {
            console.error("Failed to load media:", error);
            if (galleryGrid) {
                galleryGrid.innerHTML = `
                    <p class="error">Unable to load your collection. 
                    Check if the backend server is running on port 5001.</p>
                `;
            }
        }
    };

    // Listen for category changes (Anime, Manga, etc.)
    filterSelect?.addEventListener('change', (e) => {
        loadMediaEntries(e.target.value);
    });

    // Initial load on page visit
    await loadMediaEntries();
});