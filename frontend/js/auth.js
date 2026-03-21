/**
 * Auth Manager - FULLY COMPLETED
 * Handles session validation, role-based access, and API header injection.
 */

const Auth = {
    // 1. Check if user is logged in
    isAuthenticated: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // 2. Get current user's role (admin or user)
    getUserRole: () => {
        return localStorage.getItem('userRole') || 'guest';
    },

    // 3. Get API Headers (Injects role for the backend middleware)
    getAuthHeaders: () => {
        return {
            'Content-Type': 'application/json',
            'x-user-role': Auth.getUserRole(),
            'x-username': localStorage.getItem('username') || 'anonymous'
        };
    },

    // 4. Protection Gate: Redirect unauthorized users
    checkAccess: (requiredRole = 'user') => {
        if (!Auth.isAuthenticated()) {
            window.location.href = '/login.html';
            return false;
        }
        
        if (requiredRole === 'admin' && Auth.getUserRole() !== 'admin') {
            window.location.href = '/tracker.html'; // Kick non-admins to main tracker
            return false;
        }
        return true;
    },

    // 5. Secure Logout
    logout: () => {
        localStorage.clear();
        window.location.href = '/index.html';
    }
};

// Make it globally accessible
window.Auth = Auth;

// Self-executing security check for protected pages
(function() {
    const path = window.location.pathname;
    if (path.includes('admin/')) {
        Auth.checkAccess('admin');
    } else if (path.includes('tracker.html') || path.includes('profile.html')) {
        Auth.checkAccess('user');
    }
})();