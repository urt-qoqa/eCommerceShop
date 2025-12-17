// Auth form handling
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        localStorage.setItem('userEmail', email);
        showNotification('Signed in successfully!');
        setTimeout(() => {
            window.location.href = 'index-new.html';
        }, 1500);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        
        if (password !== confirm) {
            showNotification('Passwords do not match!');
            return;
        }
        
        const email = document.getElementById('email').value;
        localStorage.setItem('userEmail', email);
        showNotification('Account created successfully!');
        setTimeout(() => {
            window.location.href = 'index-new.html';
        }, 1500);
    });
}
