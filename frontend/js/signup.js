/**
 * Signup Controller
 * Validates registration data and initializes new user sessions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Capture Form Data
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // 2. Basic Validation
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            if (password.length < 8) {
                alert("For security, passwords must be at least 8 characters.");
                return;
            }

            console.log(`Registering new user: ${username} (${email})`);

            // 3. Mock Registration Success
            // Simulate a successful account creation by setting the session
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'user'); // Default new accounts to 'user'
            localStorage.setItem('username', username);

            // 4. Redirect to Tracker
            alert(`Welcome to Media Tracker, ${username}!`);
            window.location.href = '/tracker.html';
        });
    }
});