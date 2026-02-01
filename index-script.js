<<<<<<< HEAD
// Product data for the home page
const homePageProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        category: 'Laptops'
    },
    {
        id: 2,
        title: 'iPhone 15 Pro Max',
        price: 1199.00,
        rating: 4.8,
        reviews: 5621,
        description: 'Latest flagship smartphone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.',
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
        category: 'Phones'
    },
    {
        id: 3,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.7,
        reviews: 1834,
        description: 'Premium Windows laptop featuring stunning 3.5K OLED display, Intel Core i9 processor, and sleek aluminum chassis.',
        image: 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=400&h=400&fit=crop',
        category: 'Laptops'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features for productivity and creativity.',
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
        category: 'Phones'
    },
    {
        id: 5,
        title: 'Sony WH-1000XM5 Headphones',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Accessories'
    },
    {
        id: 6,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
        category: 'Tablets'
    }
];

// Load products on home page
function loadHomeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = homePageProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.title)}'">
            </div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</div>
                <span class="rating-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div style="display: flex; gap: 8px;">
                <a href="product-detail.html?id=${product.id}" class="btn btn-secondary" style="flex: 1;">View Details</a>
                <button class="btn btn-secondary" onclick="addProductToCart(${product.id}, '${product.title}', ${product.price})" style="flex: 1;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addProductToCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${title} added to cart!`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHomeProducts();
});
=======
// ByteHub Shopping Cart - Pure JavaScript (No Frameworks)

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('bytehub_cart')) || [];

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }

    // Update cart modal content
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <p style="font-size: 48px;">🛒</p>
                    <p>Your cart is empty</p>
                    <button class="btn btn-primary" onclick="window.location.href='products.html'">Start Shopping</button>
                </div>
            `;
        } else {
            let html = '';
            cart.forEach((item, index) => {
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
            cartContent.innerHTML = html;
        }
    }

    // Update total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Add item to cart
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image || 'https://via.placeholder.com/60',
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('bytehub_cart', JSON.stringify(cart));

    // Update display
    updateCartDisplay();

    // Show notification
    showNotification(`${name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('bytehub_cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${itemName} removed from cart`, 'info');
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('bytehub_cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Cart cleared', 'info');
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8'
    };

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cart modal controls
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        cartOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if (cartClose) {
    cartClose.addEventListener('click', closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartModal) cartModal.style.display = 'none';
    if (cartOverlay) cartOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
        }
    });
}

// Dropdown for categories
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        });
    }

    // Initial cart update
    updateCartDisplay();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
>>>>>>> 830211d (	new file:   auth-script.js)
