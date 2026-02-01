document.addEventListener('DOMContentLoaded', () => {
    // Toggle Password Visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', () => {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            // Optional: Toggle icon appearance
            togglePassword.style.opacity = type === 'password' ? '0.6' : '1';
        });
    }

    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = loginForm.querySelector('button[type="submit"]');

            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Save mock user session
                localStorage.setItem('user_token', 'mock_token_123');
                localStorage.setItem('user_email', document.getElementById('email').value);

                // Redirect
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Mobile Menu Toggle (Reused logic if standard script not included)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});
