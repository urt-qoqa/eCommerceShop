<?php
require_once 'partials/header.php';
?>

<style>
.checkout-container {
    max-width: 1000px;
    margin: 60px auto;
    padding: 0 20px;
}

.checkout-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
    margin-top: 30px;
}

.checkout-section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.checkout-section h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #1a1a1a;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
}

.order-summary-item {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.order-summary-item img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    background: #f9f9f9;
    border-radius: 8px;
    padding: 5px;
}

.order-summary-details {
    flex: 1;
}

.order-summary-details h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
    color: #1a1a1a;
}

.order-summary-details p {
    margin: 0;
    font-size: 13px;
    color: #666;
}

.order-total {
    padding: 20px 0;
    border-top: 2px solid #204647;
    margin-top: 20px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
}

.total-row.grand-total {
    font-size: 20px;
    font-weight: 800;
    color: #204647;
}

@media (max-width: 768px) {
    .checkout-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<div class="checkout-container">
    <h1>Checkout</h1>
    
    <div class="checkout-grid">
        <!-- Billing Information -->
        <div class="checkout-section">
            <h3>Billing Information</h3>
            <form id="checkoutForm">
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="fullname" required>
                </div>
                
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="phone" required>
                </div>
                
                <div class="form-group">
                    <label>Address *</label>
                    <textarea name="address" rows="3" required></textarea>
                </div>
                
                <div class="form-group">
                    <label>City *</label>
                    <input type="text" name="city" required>
                </div>
                
                <div class="form-group">
                    <label>Postal Code *</label>
                    <input type="text" name="postal" required>
                </div>
                
                <div class="form-group">
                    <label>Payment Method *</label>
                    <select name="payment" required>
                        <option value="">Select Payment Method</option>
                        <option value="cash">Cash on Delivery</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Place Order</button>
            </form>
        </div>
        
        <!-- Order Summary -->
        <div class="checkout-section">
            <h3>Order Summary</h3>
            <div id="orderSummary">
                <p style="text-align: center; color: #999;">Your cart is empty</p>
            </div>
            <div class="order-total" id="orderTotal" style="display: none;">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span id="subtotalAmount">$0.00</span>
                </div>
                <div class="total-row">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                </div>
                <div class="total-row grand-total">
                    <span>Total:</span>
                    <span id="grandTotal">$0.00</span>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Load cart and display
function loadCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryDiv = document.getElementById('orderSummary');
    const totalDiv = document.getElementById('orderTotal');
    
    if (cart.length === 0) {
        summaryDiv.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        totalDiv.style.display = 'none';
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        html += `
            <div class="order-summary-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="order-summary-details">
                    <h4>${item.title}</h4>
                    <p>Qty: ${item.quantity} Ã— $${item.price.toFixed(2)}</p>
                    <p style="font-weight: 600; color: #204647;">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    
    summaryDiv.innerHTML = html;
    document.getElementById('subtotalAmount').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('grandTotal').textContent = '$' + subtotal.toFixed(2);
    totalDiv.style.display = 'block';
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real app, this would send data to server
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to home
    window.location.href = 'index.php';
});

// Load cart on page load
loadCheckoutCart();
</script>

<?php include '../partials/footer.php'; ?>


