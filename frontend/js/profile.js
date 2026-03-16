/**
 * Profile Controller - COMPLETED
 * Dynamically generates user statistics and personal activity logs.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Protection
    if (!Auth.isAuthenticated()) {
        window.location.href = '/login.html';
        return;
    }

    // 2. Load User Metadata
    const username = localStorage.getItem('username') || 'User';
    document.getElementById('profile-name').textContent = username;

    try {
        // 3. Fetch User's Personal Data
        const userData = await api.get('/media'); // In v2.1, this will be /api/media/user/:id
        
        // 4. Calculate Stats
        const totalItems = userData.length;
        const totalEps = userData.reduce((sum, item) => sum + (item.current_progress || 0), 0);
        
        // Find "Favorite Genre" by counting occurrences
        const genres = userData.map(item => item.media_type);
        const favoriteGenre = genres.sort((a,b) =>
            genres.filter(v => v===a).length - genres.filter(v => v===b).length
        ).pop() || "None";

        // 5. Inject into UI
        document.getElementById('stat-total-items').textContent = totalItems;
        document.getElementById('stat-total-eps').textContent = totalEps;
        document.getElementById('stat-favorite-genre').textContent = favoriteGenre;

        console.log(`Analytics complete for ${username}: ${totalEps} episodes watched.`);
        
    } catch (error) {
        console.error("Profile data load failed:", error);
    }
});