/**
 * Global Navigation System v2.0
 * Manages UI states, active links, and role-based access.
 */

const initNavigation = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Handle Active Link Styling
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove existing active classes
        link.classList.remove('active-link');

        // Check if the current URL matches the link's destination
        if (currentPath === href || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active-link');
        }
    });

    // 2. Mock Authentication Check
    // In v2.1, this will check localStorage for a JWT
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole') || 'guest';

    updateNavForUser(isLoggedIn, userRole);
};

// 3. Dynamic UI Updates based on User Status
const updateNavForUser = (isLoggedIn, role) => {
    const authLinks = document.getElementById('auth-links');
    if (!authLinks) return;

    if (isLoggedIn) {
        let adminLink = role === 'admin' ? '<a href="/admin/dashboard.html" class="nav-link">Admin</a>' : '';
        authLinks.innerHTML = `
            ${adminLink}
            <a href="/profile.html" class="nav-link">Profile</a>
            <button id="logout-btn" class="nav-link" style="background:none; border:none; cursor:pointer;">Logout</button>
        `;
        
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/login.html';
        });
    }
};

document.addEventListener('DOMContentLoaded', initNavigation);