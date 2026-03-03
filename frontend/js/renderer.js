/**
 * UI Renderer Component
 * Converts raw media data into gallery HTML components.
 */

const Renderer = {
    /**
     * Renders a single media card
     * @param {Object} item - The media item from the database
     */
    createCard: (item) => {
        // Calculate progress percentage for the progress bar
        const progressPercent = (item.current_progress / item.total_episodes) * 100;
        
        return `
            <div class="media-card" data-id="${item.id}">
                <div class="card-image-container">
                    <img src="${item.image_url || '/assets/placeholder.jpg'}" alt="${item.title}" loading="lazy">
                    <span class="status-badge">${item.tracking_status}</span>
                </div>
                <div class="card-content">
                    <h4>${item.title}</h4>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <p class="progress-text">${item.current_progress} / ${item.total_episodes} eps</p>
                </div>
            </div>
        `;
    },

    /**
     * Populates a container with a list of media cards
     */
    renderGallery: (containerId, items) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = '<p class="no-data">No media found matching your filters.</p>';
            return;
        }

        container.innerHTML = items.map(item => Renderer.createCard(item)).join('');
    }
};

window.Renderer = Renderer;