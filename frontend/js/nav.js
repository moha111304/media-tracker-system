/**
 * Global Navigation Controller
 * Handles active link states and global logout functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight Active Page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
           (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
            link.classList.add('active-nav');
        }
    });

    // 2. Global Logout Handler
    const logoutBtn = document.getElementById('global-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
                // Clear all session data
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                
                // Redirect to landing page
                window.location.href = '/index.html';
            }
        });
    }

    // 3. Admin UI Protection (Hide Admin link for regular users)
    const adminLink = document.getElementById('nav-admin-link');
    if (adminLink && localStorage.getItem('userRole') !== 'admin') {
        adminLink.style.display = 'none';
    }
});