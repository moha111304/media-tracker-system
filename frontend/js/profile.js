/**
 * Profile Controller
 * Manages user metadata, session security, and personal stats display.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Security Check: Redirect if not authenticated
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '/login.html';
        return;
    }

    // 2. Load User Data
    const username = localStorage.getItem('username') || 'Member';
    const userRole = localStorage.getItem('userRole') || 'User';
    
    // 3. Update UI Elements
    const nameDisplay = document.getElementById('profile-name');
    const roleBadge = document.getElementById('role-badge');
    const joinDate = document.getElementById('join-date');

    if (nameDisplay) nameDisplay.textContent = username;
    if (roleBadge) {
        roleBadge.textContent = userRole.toUpperCase();
        roleBadge.style.color = userRole === 'admin' ? 'var(--accent-color)' : '#aaa';
    }
    
    // Mocking a join date for now
    if (joinDate) joinDate.textContent = "Joined: Feb 2026";

    console.log(`Profile loaded for: ${username} [${userRole}]`);
});