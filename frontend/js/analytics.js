/**
 * Analytics Controller
 * Aggregates media data to provide system-wide insights.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('stats-grid');

    const calculateStats = (data) => {
        const total = data.length;
        const completed = data.filter(item => item.current_progress >= item.total_episodes).length;
        
        // Calculate Mean Rating (assuming items have a 'rating' field)
        const ratedItems = data.filter(item => item.rating > 0);
        const avgRating = ratedItems.length > 0 
            ? (ratedItems.reduce((sum, item) => sum + item.rating, 0) / ratedItems.length).toFixed(1)
            : "N/A";

        return { total, completed, avgRating };
    };

    const updateUI = (stats) => {
        const cards = document.querySelectorAll('.stat-number');
        if (cards.length >= 3) {
            cards[0].textContent = stats.total;
            cards[1].textContent = stats.completed;
            cards[2].textContent = stats.avgRating;
        }
    };

    try {
        console.log("Generating insights...");
        const mediaData = await api.get('/media');
        const stats = calculateStats(mediaData);
        updateUI(stats);
    } catch (error) {
        console.error("Analytics fetch failed:", error);
    }
});