/**
 * Main Application Orchestrator - COMPLETED
 * Bootstraps global services and coordinates module interactions.
 */

const App = {
    /**
     * Initialize Global Services
     */
    init: () => {
        console.log(`%c Media Tracker v${window.APP_CONFIG?.APP_VERSION || '2.0'} Initialized`, "color: #00dac6; font-weight: bold;");

        // 1. Theme Check (Dark Mode by default)
        App.applyTheme();

        // 2. Global Event Delegation
        // Handle clicks for shared components like the Sidebar or Toasts
        document.body.addEventListener('click', App.handleGlobalClicks);

        // 3. UI Synchronization
        // If we are on a page that needs data, trigger the initial fetch
        if (typeof loadMediaEntries === 'function') {
            console.log("Auto-loading media for current view...");
        }
    },

    /**
     * Applies the system-wide visual theme
     */
    applyTheme: () => {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    },

    /**
     * Centralized Error Handler
     * Instead of raw alerts, we use the Toast utility we built.
     */
    handleError: (message, error) => {
        console.error(`[App Error]: ${message}`, error);
        if (window.Utils && window.Utils.showToast) {
            window.Utils.showToast(message, 'error');
        }
    },

    /**
     * Global Click Interceptor
     * Useful for handling nav toggles or "Coming Soon" features
     */
    handleGlobalClicks: (e) => {
        const target = e.target;
        
        // Example: Handle sidebar toggle if it exists
        if (target.id === 'sidebar-toggle') {
            document.getElementById('nav-sidebar').classList.toggle('active');
        }
    }
};

// Start the app when the DOM is ready
document.addEventListener('DOMContentLoaded', App.init);

// Export to window for global access
window.App = App;