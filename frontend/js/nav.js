/**
 * Global Navigation Logic
 * Handles active link highlighting and role-based menu visibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    // Highlight the active navigation link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) && href !== '#') {
            link.style.color = 'var(--accent-color)';
            link.style.borderBottom = '2px solid var(--accent-color)';
        }
    });

    // Placeholder for Auth Logic: 
    // In the future, this will hide 'Login' and show 'Profile/Admin' 
    // based on the presence of a JWT token.
    console.log("Navigation System initialized...");
});