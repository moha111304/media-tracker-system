/**
 * Modal Controller
 * Manages the "Add Media" form interaction and data submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('add-media-modal');
    const openBtn = document.getElementById('open-add-modal');
    const closeBtn = document.getElementById('close-modal');
    const addForm = document.getElementById('add-media-form');

    // 1. Open/Close Logic
    if (openBtn) {
        openBtn.addEventListener('click', () => modal.style.display = 'flex');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    // Close if user clicks outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // 2. Form Submission
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const newMedia = {
                title: document.getElementById('new-title').value,
                media_type: document.getElementById('new-type').value,
                total_episodes: parseInt(document.getElementById('new-total').value),
                image_url: document.getElementById('new-image').value,
                tracking_status: 'Watching', // Default status
                current_progress: 0
            };

            try {
                console.log("Saving new media...", newMedia);
                
                // Use my API service to push to PostgreSQL
                await api.post('/media', newMedia);

                // Success: Close modal and refresh the gallery
                modal.style.display = 'none';
                addForm.reset();
                
                // Trigger a refresh of the tracker gallery
                if (typeof loadMediaEntries === 'function') {
                    await loadMediaEntries();
                }
            } catch (error) {
                alert("Error saving media. Is the server running?");
            }
        });
    }
});