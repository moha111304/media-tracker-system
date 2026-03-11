/**
 * Admin Action Controller
 * Handles database seeding, maintenance, and bulk operations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Security Check: Only admins should run these
    if (localStorage.getItem('userRole') !== 'admin') {
        console.warn("Unauthorized access attempt to admin tools.");
        return;
    }

    const seedBtn = document.getElementById('run-seed-btn');
    const wipeBtn = document.getElementById('run-wipe-btn');

    // 2. Database Seeding Logic
    if (seedBtn) {
        seedBtn.addEventListener('click', async () => {
            if (!confirm("This will restore default media entries. Proceed?")) return;
            
            try {
                seedBtn.textContent = "Seeding...";
                seedBtn.disabled = true;
                
                await api.post('/admin/seed'); // Hits your Express seed route
                
                alert("Database successfully seeded!");
                window.location.reload();
            } catch (err) {
                alert("Seeding failed. Check server connection.");
            } finally {
                seedBtn.textContent = "Run Seed";
                seedBtn.disabled = false;
            }
        });
    }

    // 3. System Wipe Logic
    if (wipeBtn) {
        wipeBtn.addEventListener('click', async () => {
            if (!confirm("CRITICAL: This will delete ALL media entries. Are you sure?")) return;

            try {
                await api.post('/admin/clear-all');
                alert("Database cleared.");
                window.location.reload();
            } catch (err) {
                console.error("Wipe failed:", err);
            }
        });
    }
});