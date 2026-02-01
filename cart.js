// Global cart functions with backend integration
let isCartInitialized = false;

// Initialize cart from backend on page load
async function initializeCart() {
    if (isCartInitialized) return;

    try {
        const response = await fetch('backend/cart_ajax.php?action=get');
        const data = await response.json();

        if (data.success) {
            updateCartCountDisplay(data.count || 0);
            isCartInitialized = true;
        }
    } catch (error) {
        console.error('Error initializing cart:', error);
    }
}

// Add to cart with backend integration
async function addToCart(productId, productName, price, image = '') {
    try {
        const response = await fetch('backend/cart_ajax.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=add&product_id=${productId}&quantity=1`
        });

        const result = await response.json();

        if (result.success) {
            await updateCartFromBackend();
            showNotification(`${productName} added to cart!`, 'success');
        } else {
            showNotification(result.error || 'Failed to add to cart', 'error');
        }
    } catch (error) {
        console.error('Cart error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Update cart display from backend
async function updateCartFromBackend() {
    try {
        const response = await fetch('backend/cart_ajax.php?action=get');
        const data = await response.json();

        if (data.success) {
            updateCartCountDisplay(data.count || 0);
            if (document.getElementById('cartModal')?.style.display === 'flex') {
                await renderCartModal();
            }
        }
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

function updateCartCountDisplay(count) {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.style.display = 'inline-flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Render cart modal with backend data
async function renderCartModal() {
    const content = document.getElementById('cartModalContent');
    const subtotalEl = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (!content) return;

    try {
        const response = await fetch('backend/cart_ajax.php?action=get');
        const data = await response.json();

        if (!data.success || !data.items || data.items.length === 0) {
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

        let html = '';
        data.items.forEach(item => {
            html += `
                <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <img src="${item.image_url || 'https://via.placeholder.com/60x60?text=No+Image'}" 
                         alt="${item.name}" 
                         style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; background: white;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px; font-size: 14px; line-height: 1.3;">${item.name}</h4>
                        <p style="margin: 0 0 8px; color: #204647; font-weight: bold;">$${parseFloat(item.price).toFixed(2)}</p>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 12px; color: #666;">Qty: ${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.cart_id}, ${item.quantity - 1})" 
                                        class="quantity-btn" 
                                        ${item.quantity <= 1 ? 'disabled' : ''}
                                        aria-label="Decrease quantity">−</button>
                                <button onclick="updateCartQuantity(${item.cart_id}, ${item.quantity + 1})" 
                                        class="quantity-btn" 
                                        aria-label="Increase quantity">+</button>
                            </div>
                            <button onclick="removeCartItem(${item.cart_id})" 
                                    class="remove-btn" 
                                    aria-label="Remove item">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        content.innerHTML = html;
        if (subtotalEl) subtotalEl.textContent = `$${parseFloat(data.total || 0).toFixed(2)}`;
        if (checkoutBtn) checkoutBtn.disabled = false;

    } catch (error) {
        console.error('Error rendering cart:', error);
        content.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading cart</p>';
    }
}

// Update cart item quantity
async function updateCartQuantity(cartId, newQuantity) {
    if (newQuantity < 1) return;

    try {
        const response = await fetch('backend/cart_ajax.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=update&cart_id=${cartId}&quantity=${newQuantity}`
        });

        const result = await response.json();

        if (result.success) {
            await updateCartFromBackend();
        } else {
            showNotification(result.error || 'Failed to update quantity', 'error');
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        showNotification('An error occurred', 'error');
    }
}

// Remove item from cart
async function removeCartItem(cartId) {
    try {
        const response = await fetch('backend/cart_ajax.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=remove&cart_id=${cartId}`
        });

        const result = await response.json();

        if (result.success) {
            await updateCartFromBackend();
            showNotification('Item removed from cart', 'info');
        } else {
            showNotification(result.error || 'Failed to remove item', 'error');
        }
    } catch (error) {
        console.error('Error removing item:', error);
        showNotification('An error occurred', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const colors = {
        success: { bg: '#28a745', icon: '✓' },
        error: { bg: '#dc3545', icon: '✗' },
        info: { bg: '#204647', icon: 'ℹ' }
    };

    const color = colors[type] || colors.info;

    const notification = document.createElement('div');
    notification.className = 'notification';
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
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

//Cart Modal Functions
function openCartModal() {
    renderCartModal();
    const cartModalOverlay = document.getElementById('cartModalOverlay');
    const cartModal = document.getElementById('cartModal');
    if (cartModalOverlay) cartModalOverlay.style.display = 'block';
    if (cartModal) {
        cartModal.style.display = 'flex';
        cartModal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    const cartModalOverlay = document.getElementById('cartModalOverlay');
    const cartModal = document.getElementById('cartModal');
    if (cartModalOverlay) cartModalOverlay.style.display = 'none';
    if (cartModal) {
        cartModal.style.display = 'none';
        cartModal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }

    const cartModalClose = document.getElementById('cartModalClose');
    if (cartModalClose) {
        cartModalClose.addEventListener('click', closeCartModal);
    }

    const cartModalOverlay = document.getElementById('cartModalOverlay');
    if (cartModalOverlay) {
        cartModalOverlay.addEventListener('click', (e) => {
            if (e.target === cartModalOverlay) closeCartModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartModal = document.getElementById('cartModal');
            if (cartModal && cartModal.style.display === 'flex') {
                closeCartModal();
            }
        }
    });
});

// Add necessary styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .quantity-btn {
        width: 24px; height: 24px; border: 1px solid #ddd; background: white;
        border-radius: 4px; cursor: pointer; font-size: 14px; display: flex;
        align-items: center; justify-content: center; transition: all 0.2s;
    }
    .quantity-btn:hover:not(:disabled) {
        background: #204647; color: white; border-color: #204647;
    }
    .quantity-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .remove-btn {
        background: none; border: none; color: #dc3545; font-size: 12px;
        cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: all 0.2s;
    }
    .remove-btn:hover { background: #dc3545; color: white; }
    
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
