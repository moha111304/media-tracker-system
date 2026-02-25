/**
 * Login Controller
 * Captures user credentials and initializes the session.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Capture Form Data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log(`Attempting login for: ${email}`);

            // 2. Mock Authentication Logic
            // For now simulate a successful login. 
            // If the email is 'admin@test.com', grant admin rights.
            if (password.length >= 6) {
                localStorage.setItem('isLoggedIn', 'true');
                
                if (email.includes('admin')) {
                    localStorage.setItem('userRole', 'admin');
                    window.location.href = '/admin/dashboard.html';
                } else {
                    localStorage.setItem('userRole', 'user');
                    window.location.href = '/tracker.html';
                }
            } else {
                alert("Password must be at least 6 characters.");
            }
        });
    }
});