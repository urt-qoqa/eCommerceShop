// Standardized Cart Storage Key
const CART_STORAGE_KEY = 'bytehub_cart';

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Logo image handler - automatically uses uploaded logo.png or logo.svg if available
function initLogo() {
    const logoIcons = document.querySelectorAll('#logoIcon, .logo-icon');
    logoIcons.forEach(logoIcon => {
        // Try PNG first
        const png = new Image();
        png.src = 'logo.png';
        png.onload = function () {
            applyLogo(logoIcon, 'logo.png');
        };
        png.onerror = function () {
            // Try SVG if PNG fails
            const svg = new Image();
            svg.src = 'logo.svg';
            svg.onload = function () {
                applyLogo(logoIcon, 'logo.svg');
            };
            svg.onerror = function () {
                // Both failed, use default CSS logo
                logoIcon.classList.remove('has-image');
                logoIcon.style.backgroundImage = 'none';
            };
        };
    });
}

function applyLogo(element, src) {
    element.classList.add('has-image');
    element.style.backgroundImage = `url('${src}')`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
}

// Initialize logo handling
initLogo();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}
