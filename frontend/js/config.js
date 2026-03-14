
/**
 * Global Configuration
 * Manages environment-specific variables.
 */

const CONFIG = {
    // Switch to your production URL when you deploy
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5001/api'
        : 'https://api.your-deployed-app.com/api',
    
    APP_VERSION: '2.0.0-beta',
    ENVIRONMENT: window.location.hostname === 'localhost' ? 'development' : 'production'
};

// Freeze the object to prevent accidental changes at runtime
Object.freeze(CONFIG);

window.APP_CONFIG = CONFIG;