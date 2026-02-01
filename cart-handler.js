// Unified Cart Logic for ByteHub
const CART_KEY = 'bytehub_cart';

// Initialize Cart
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');

    // Update Badge Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        if (totalItems > 0) {
            el.textContent = totalItems;
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });

    // Update Modal Content
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <span class="cart-empty-icon">🛒</span>
                    <p style="color: #666; margin-bottom: 20px;">Your cart is empty</p>
                    <button class="btn btn-primary" onclick="window.location.href='products.html'">Continue Shopping</button>
                </div>
            `;
        } else {
            cartContent.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <div class="cart-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="cart-remove" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Update Total Price
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

window.addToCart = function (id, name, price, image, qty = 1) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ id, name, price, image, quantity: qty });
    }
    saveCart();
    showNotification(`${name} added to cart!`, 'success');
    openCart();
};

window.updateQuantity = function (id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
        }
    }
};

window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
};

window.openCart = function () {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeCart = function () {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

function showNotification(message, type = 'success') {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.className = `notification active ${type}`;

    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Attach to cart buttons
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    // Attach to close buttons
    const closeBtn = document.getElementById('cartClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCart);
    }

    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }

    // Support for ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
});
