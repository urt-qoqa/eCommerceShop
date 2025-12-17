// Logo image handler - automatically uses uploaded image.png if available
const logoIcons = document.querySelectorAll('#logoIcon, .logo-icon');
logoIcons.forEach(logoIcon => {
    // Try to load the uploaded image
    const img = new Image();
    img.src = 'logo.png';

    img.onload = function() {
        logoIcon.classList.add('has-image');
        logoIcon.style.backgroundImage = `url('logo.png')`;
        logoIcon.style.backgroundSize = 'cover';
        logoIcon.style.backgroundPosition = 'center';
    };

    img.onerror = function() {
        // Keep the default 'b' icon with blue circular design if image not found
        console.log('Using default ByteHub logo. Upload your logo as logo.png to replace it.');
    };
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
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

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.btn-secondary');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;

        // Create a simple notification
        showNotification(`${productName} added to cart!`);
    });
});

// Notification function
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #204647;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const email = input.value;
        if (email) {
            showNotification('Thanks for subscribing!');
            input.value = '';
        }
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Category card click handling
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryTitle = this.querySelector('.category-title').textContent;
        showNotification(`Browsing ${categoryTitle}...`);
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value;
            if (searchTerm) {
                showNotification(`Searching for "${searchTerm}"...`);
            }
        }
    });
}

// Add hover effect for product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here
        console.log('Mobile view detected');
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Cart Modal Functionality - Fixed Animation
const cartBtn = document.getElementById('cartBtn');
const cartModalOverlay = document.getElementById('cartModalOverlay');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartModalContent = document.getElementById('cartModalContent');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open cart modal with smooth animation
if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCartModal();
    });
}

// Close cart modal
if (cartModalClose) {
    cartModalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCartModal();
    });
}

// Close on overlay click
if (cartModalOverlay) {
    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) {
            closeCartModal();
        }
    });
}

// Prevent modal close when clicking inside
if (cartModal) {
    cartModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function openCartModal() {
    if (cartModalOverlay) {
        cartModalOverlay.classList.add('active');
        cartModalOverlay.style.display = 'block';
    }
    if (cartModal) {
        cartModal.classList.add('active');
        cartModal.style.display = 'flex';
    }
    document.body.style.overflow = 'hidden';
    renderCartModal();
}

function closeCartModal() {
    if (cartModalOverlay) {
        cartModalOverlay.classList.remove('active');
        setTimeout(() => {
            cartModalOverlay.style.display = 'none';
        }, 300);
    }
    if (cartModal) {
        cartModal.classList.remove('active');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 300);
    }
    document.body.style.overflow = 'auto';
}

function renderCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        if (cartModalContent) {
            cartModalContent.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        }
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        if (cartSubtotal) cartSubtotal.textContent = '$0.00';
        return;
    }

    let subtotal = 0;
    let cartHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="https://via.placeholder.com/80x80?text=${encodeURIComponent(item.title)}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/80x80'">
                </div>
                <div class="cart-item-content">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    if (cartModalContent) cartModalContent.innerHTML = cartHTML;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.style.display = 'block';
}

function increaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartModal();
        showNotification('Quantity updated!');
    }
}

function decreaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartModal();
    }
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCartModal();
    showNotification('Product removed from cart');
}
