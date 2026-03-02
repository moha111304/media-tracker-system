/**
 * Global API Service
 * Centralized fetch wrapper for backend communication.
 */

const API_BASE_URL = 'http://localhost:5001/api';

const api = {
    // GET request helper
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`API Get Error [${endpoint}]:`, error);
            throw error;
        }
    },

    // POST request helper
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`API Post Error [${endpoint}]:`, error);
            throw error;
        }
    }
};

// Make it available globally
window.api = api;