<<<<<<< HEAD
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
=======
// Enhanced JavaScript with performance optimizations and better mobile support

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

// Logo image handler - automatically uses uploaded image.png if available
const logoIcons = document.querySelectorAll('#logoIcon, .logo-icon');
logoIcons.forEach(logoIcon => {
    const img = new Image();
    img.src = 'logo.png';

    img.onload = function () {
        logoIcon.classList.add('has-image');
        logoIcon.style.backgroundImage = `url('logo.png')`;
        logoIcon.style.backgroundSize = 'cover';
        logoIcon.style.backgroundPosition = 'center';
    };

    img.onerror = function () {
        // Logo image doesn't exist, use default
        logoIcon.classList.remove('has-image');
    };
});

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

// Cart functionality with better error handling
window.addFromCard = function (button) {
    const productCard = button.closest('.product-card');
    if (!productCard) {
        console.error('Product card not found');
        return;
    }

    const imgTag = productCard.querySelector('img');
    const hiddenData = productCard.querySelector('div[data-id]');
    let productId, productName, productPrice, productImage;

    if (hiddenData) {
        productId = hiddenData.dataset.id;
        productName = hiddenData.dataset.name;
        productPrice = parseFloat(hiddenData.dataset.price);
        productImage = hiddenData.dataset.image || (imgTag ? imgTag.src : '');
    } else {
        // Fallback to parsing DOM
        const titleElement = productCard.querySelector('.product-title, h3');
        const priceElement = productCard.querySelector('.product-price');

        if (!titleElement || !priceElement) {
            console.error('Product information not found');
            return;
        }

        productName = titleElement.textContent.trim();
        const priceText = priceElement.textContent.replace(/[$,]/g, '');
        productPrice = parseFloat(priceText);
        productId = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        productImage = imgTag ? imgTag.src : '';
    }
    addToCart(productId, productName, productPrice, productImage);
};

function addToCart(id, title, price, image) {
    try {
        const cartItem = {
            id: id,
            title: title,
            price: price,
            image: image,
            quantity: 1,
            addedAt: new Date().toISOString()
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id == id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        showNotification(`${title} added to cart!`, 'success');
        renderCartModal();
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add item to cart', 'error');
    }
}

// Enhanced notification function
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    const colors = {
        success: { bg: '#28a745', icon: '✓' },
        error: { bg: '#dc3545', icon: '✗' },
        info: { bg: '#204647', icon: 'ℹ' }
    };

    const color = colors[type] || colors.info;

    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${color.bg}; color: white;
        padding: 16px 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000; animation: slideIn 0.3s ease-out; font-weight: 600;
        display: flex; align-items: center; gap: 10px; max-width: 300px;
    `;
    notification.innerHTML = `<span style="font-size: 18px;">${color.icon}</span> ${message}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Enhanced Mobile Menu Implementation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

function handleMobileMenu() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
        if (mainNav) {
            mainNav.style.display = 'none';
            mainNav.setAttribute('aria-hidden', 'true');
        }
    } else {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        if (mainNav) {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'row';
            mainNav.style.position = 'static';
            mainNav.style.boxShadow = 'none';
            mainNav.style.background = 'transparent';
            mainNav.style.padding = '0';
            mainNav.setAttribute('aria-hidden', 'false');
        }
    }
}

// Initial mobile menu setup
handleMobileMenu();

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mainNav.style.display === 'flex';

        if (isOpen) {
            mainNav.style.display = 'none';
            mainNav.setAttribute('aria-hidden', 'true');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'column';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.background = 'white';
            mainNav.style.padding = '20px';
            mainNav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            mainNav.style.zIndex = '999';
            mainNav.setAttribute('aria-hidden', 'false');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    });
}

// Debounced resize handler
window.addEventListener('resize', debounce(handleMobileMenu, 250));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        mobileMenuBtn &&
        mainNav &&
        mainNav.style.display === 'flex' &&
        !mainNav.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
        mainNav.style.display = 'none';
        mainNav.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});


// Ensure Nav is visible on Desktop resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (mainNav) {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'row';
            mainNav.style.position = 'static';
            mainNav.style.boxShadow = 'none';
        }
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
    } else {
        if (mainNav) mainNav.style.display = 'none';
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
    }
});


// Enhanced Cart Modal Functionality
const cartBtn = document.getElementById('cartBtn');
const cartModalOverlay = document.getElementById('cartModalOverlay');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartModalContent = document.getElementById('cartModalContent');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.getElementById('cartCount');

// Update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    if (cartCount) {
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'inline-flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Initialize cart count on page load
updateCartCount();

if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });
}

if (cartModalClose) {
    cartModalClose.addEventListener('click', closeCartModal);
}

if (cartModalOverlay) {
    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) closeCartModal();
    });
}

// Close cart on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal && cartModal.style.display === 'flex') {
        closeCartModal();
    }
});

function openCartModal() {
    renderCartModal();
    if (cartModalOverlay) cartModalOverlay.style.display = 'block';
    if (cartModal) cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    cartModal.setAttribute('aria-hidden', 'false');
}

function closeCartModal() {
    if (cartModalOverlay) cartModalOverlay.style.display = 'none';
    if (cartModal) cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    cartModal.setAttribute('aria-hidden', 'true');
}

window.renderCartModal = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const content = document.getElementById('cartModalContent');
    const subtotalEl = document.getElementById('cartSubtotal');

    if (!content) return;

    if (cart.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 48px; color: #ddd; margin-bottom: 20px;">🛒</div>
                <h3 style="color: #666; margin-bottom: 10px;">Your cart is empty</h3>
                <p style="color: #999; margin-bottom: 20px;">Add some tech products to get started!</p>
                <button class="btn btn-primary" onclick="closeCartModal(); window.location.href='backend/products.php'">Shop Now</button>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    let subtotal = 0;
    let html = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
            <div class="cart-item" data-item-id="${item.id}" style="display: flex; gap: 15px; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <img src="${item.image || 'https://via.placeholder.com/60x60?text=No+Image'}" 
                     alt="${item.title}" 
                     style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; background: white;"
                     onerror="this.src='https://via.placeholder.com/60x60?text=Error'">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px; font-size: 14px; line-height: 1.3;">${item.title}</h4>
                    <p style="margin: 0 0 8px; color: #204647; font-weight: bold;">$${item.price.toFixed(2)}</p>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 12px; color: #666;">Qty: ${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" 
                                    class="quantity-btn" 
                                    ${item.quantity <= 1 ? 'disabled' : ''}
                                    aria-label="Decrease quantity">−</button>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" 
                                    class="quantity-btn" 
                                    aria-label="Increase quantity">+</button>
                        </div>
                        <button onclick="removeItem('${item.id}')" 
                                class="remove-btn" 
                                aria-label="Remove item">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    content.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
};

// Update item quantity
window.updateQuantity = function (id, newQuantity) {
    if (newQuantity < 1) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id == id);

    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartModal();
    }
};

window.removeItem = function (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartModal();
    showNotification('Item removed from cart', 'info');
};

// Add CSS for new cart styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .quantity-btn {
        width: 24px;
        height: 24px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    
    .quantity-btn:hover:not(:disabled) {
        background: #204647;
        color: white;
        border-color: #204647;
    }
    
    .quantity-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .remove-btn {
        background: none;
        border: none;
        color: #dc3545;
        font-size: 12px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .remove-btn:hover {
        background: #dc3545;
        color: white;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(cartStyles);
>>>>>>> 830211d (	new file:   auth-script.js)
