/**
 * Authentication & Session Manager
 * Handles login state, token storage, and logout redirects.
 */

const Auth = {
    // Check if the user is currently authenticated
    isAuthenticated: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Get the current user's role (admin vs user)
    getUserRole: () => {
        return localStorage.getItem('userRole') || 'guest';
    },

    // Handle Logout
    logout: () => {
        console.log("Logging out user...");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('authToken'); // Placeholder for future JWT
        
        // Redirect to login page
        window.location.href = '/login.html';
    },

    // Secure a page (Redirect if not logged in)
    // Usage: Auth.protectPage('admin');
    protectPage: (requiredRole = 'user') => {
        if (!Auth.isAuthenticated()) {
            window.location.href = '/login.html';
            return;
        }

        if (requiredRole === 'admin' && Auth.getUserRole() !== 'admin') {
            window.location.href = '/tracker.html'; // Redirect non-admins
        }
    }
};

// Export for use in other scripts
window.Auth = Auth;