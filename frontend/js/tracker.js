/**
 * Tracker Controller
 * Handles media gallery rendering, searching, and category filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('media-search');
    const filterSelect = document.getElementById('media-filter');
    const galleryGrid = document.getElementById('gallery-grid');

    // 1. Mock Filter Logic
    // Wwill eventually filter data fetched from GET /api/media
    const handleFilter = () => {
        const searchTerm = searchInput?.value.toLowerCase();
        const filterType = filterSelect?.value;

        console.log(`Filtering for: "${searchTerm}" in category: ${filterType}`);
        
    };

    // 2. Event Listeners
    if (searchInput) {
        searchInput.addEventListener('input', handleFilter);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', handleFilter);
    }

    console.log("Tracker Gallery Logic Initialized.");
});

// Helper function to create a Media Card (for v2.1)
const createMediaCard = (item) => {
    return `
        <div class="media-card">
            <img src="${item.image_url}" alt="${item.title}">
            <div class="media-info">
                <h4>${item.title}</h4>
                <p>${item.current_progress} / ${item.total_episodes}</p>
            </div>
        </div>
    `;
};