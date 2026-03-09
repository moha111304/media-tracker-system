/**
 * Media Actions Controller
 * Handles updating progress and deleting entries from the UI.
 */

const MediaActions = {
    // 1. Delete an entry
    deleteEntry: async (id) => {
        if (!confirm("Are you sure you want to delete this from your tracker?")) return;

        try {
            console.log(`Deleting media ID: ${id}`);
            // Assuming your Express DELETE route is /api/media/:id
            await api.delete(`/media/${id}`); 
            
            // Refresh the UI
            if (typeof loadMediaEntries === 'function') await loadMediaEntries();
        } catch (error) {
            alert("Delete failed. Check server logs.");
        }
    },

    // 2. Increment episode progress
    incrementProgress: async (id, current, total) => {
        if (current >= total) return; // Already finished

        try {
            const updatedData = { current_progress: current + 1 };
            await api.patch(`/media/${id}`, updatedData);
            
            // Refresh the UI to see the progress bar move
            if (typeof loadMediaEntries === 'function') await loadMediaEntries();
        } catch (error) {
            console.log("Update failed.");
        }
    }
};

// Global listener for card clicks
document.getElementById('gallery-grid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.media-card');
    if (!card) return;
    
    const id = card.dataset.id;
    
    if (e.target.classList.contains('delete-btn')) {
        MediaActions.deleteEntry(id);
    } else if (e.target.classList.contains('plus-btn')) {
        const current = parseInt(card.dataset.current);
        const total = parseInt(card.dataset.total);
        MediaActions.incrementProgress(id, current, total);
    }
});