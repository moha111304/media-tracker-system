/**
 * Tracker Data Orchestrator - COMPLETED
 * Connects the API service to the UI Renderer with real-time filtering.
 */

let allMedia = []; // Local cache to allow instant filtering without API calls

const loadMediaEntries = async () => {
    const galleryGrid = document.getElementById('gallery-grid');
    try {
        // 1. Fetch data from PostgreSQL via our API Service
        allMedia = await api.get('/media');
        
        // 2. Initial render
        renderState();
    } catch (error) {
        console.error("Failed to load media:", error);
        galleryGrid.innerHTML = `<p class="error">Server Connection Failed. Check Backend.</p>`;
    }
};

/**
 * Filter Logic - Combines Search + Category
 */
const renderState = () => {
    const searchTerm = document.getElementById('media-search')?.value.toLowerCase() || "";
    const categoryFilter = document.getElementById('media-filter')?.value || "All";

    const filtered = allMedia.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === "All" || item.media_type === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    Renderer.renderGallery('gallery-grid', filtered);
};

// Event Listeners for Real-time UX
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('media-search');
    const filterSelect = document.getElementById('media-filter');

    searchInput?.addEventListener('input', renderState);
    filterSelect?.addEventListener('change', renderState);

    loadMediaEntries();
});