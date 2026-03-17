/**
 * Admin Action Controller - FULLY COMPLETED
 * Manages live inventory sync and high-level database maintenance.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Security Check: Only admins should run these
    if (localStorage.getItem('userRole') !== 'admin') {
        console.warn("Unauthorized access attempt to admin tools.");
        return;
    }

    const inventoryBody = document.getElementById('db-inventory-body');
    const seedBtn = document.getElementById('run-seed-btn');
    const wipeBtn = document.getElementById('run-wipe-btn');

    /**
     * FEATURE 1: Live Inventory Sync
     * Fetches real data from PostgreSQL and builds the admin table
     */
    const loadInventory = async () => {
        try {
            const data = await api.get('/media');
            if (!inventoryBody) return;

            if (data.length === 0) {
                inventoryBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">Database is empty. Run Seed to populate.</td></tr>`;
                return;
            }

            inventoryBody.innerHTML = data.map(item => `
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #333;">#${item.id}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #333;"><strong>${item.title}</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #333;">${item.media_type}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #333;">
                        <span class="status-badge" style="background:#444; padding:2px 8px; border-radius:4px; font-size:0.75rem;">
                            ${item.tracking_status}
                        </span>
                    </td>
                    <td style="padding: 12px; border-bottom: 1px solid #333;">
                        <button onclick="adminDelete(${item.id})" class="btn-main" style="background:#d32f2f; padding: 5px 10px; font-size: 0.8rem; border:none; border-radius:4px; cursor:pointer;">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error("Inventory sync failed:", error);
        }
    };

    /**
     * FEATURE 2: Database Seeding Logic
     */
    if (seedBtn) {
        seedBtn.addEventListener('click', async () => {
            if (!confirm("This will restore default media entries. Proceed?")) return;
            try {
                seedBtn.textContent = "Seeding...";
                seedBtn.disabled = true;
                await api.post('/admin/seed');
                alert("Database successfully seeded!");
                loadInventory(); // Refresh table instead of full reload
            } catch (err) {
                alert("Seeding failed. Check server connection.");
            } finally {
                seedBtn.textContent = "Run Seed";
                seedBtn.disabled = false;
            }
        });
    }

    /**
     * FEATURE 3: System Wipe Logic
     */
    if (wipeBtn) {
        wipeBtn.addEventListener('click', async () => {
            if (!confirm("CRITICAL: This will delete ALL media entries. Are you sure?")) return;
            try {
                await api.post('/admin/clear-all');
                alert("Database cleared.");
                loadInventory(); // Refresh table
            } catch (err) {
                console.error("Wipe failed:", err);
            }
        });
    }

    // Global helper for the delete button (must be on window to be called by inline onclick)
    window.adminDelete = async (id) => {
        if (!confirm(`Permanently delete Media #${id}?`)) return;
        try {
            await api.delete(`/media/${id}`);
            loadInventory(); 
        } catch (err) {
            alert("Delete failed.");
        }
    };

    // Initial Load on Page Entry
    loadInventory();
});