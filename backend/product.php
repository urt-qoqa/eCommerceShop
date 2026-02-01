<?php
require_once 'models/Product.php';
$productModel = new Product();

$id = isset($_GET['id']) ? $_GET['id'] : null;
$product = null;
if ($id) {
    $product = $productModel->getById($id);
}

if (!$product) {
    header('Location: products.php');
    exit();
}

include '../partials/header.php';
?>

<div class="breadcrumb" style="background: #f9f9f9; padding: 20px 0;">
    <div class="container">
        <a href="index.php" style="color: #666; text-decoration: none;">Home</a>
        <span style="margin: 0 10px; color: #ccc;">/</span>
        <a href="products.php" style="color: #666; text-decoration: none;">Products</a>
        <span style="margin: 0 10px; color: #ccc;">/</span>
        <span style="color: #204647; font-weight: 500;"><?php echo htmlspecialchars($product['name']); ?></span>
    </div>
</div>

<section class="product-detail" style="padding: 60px 0;">
    <div class="container">
        <div class="product-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px;">
            <div class="product-gallery">
                <div class="main-image" style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); text-align: center;">
                    <img src="<?php echo htmlspecialchars($product['image_path']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" style="max-width: 100%; height: auto; max-height: 400px; object-fit: contain;">
                </div>
            </div>
            
            <div class="product-info">
                <h1 style="font-size: 36px; font-weight: 800; color: #1a1a1a; margin-bottom: 20px; line-height: 1.2;"><?php echo htmlspecialchars($product['name']); ?></h1>
                
                <div class="product-meta" style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                    <div class="price" style="font-size: 32px; font-weight: 800; color: #204647;">$<?php echo htmlspecialchars($product['price']); ?></div>
                    <div class="rating" style="color: #f59e0b; font-size: 18px;">
                        â˜…â˜…â˜…â˜…â˜† <span style="color: #999; font-size: 14px; margin-left: 5px;">(4.8)</span>
                    </div>
                </div>
                
                <div class="description" style="color: #666; line-height: 1.8; margin-bottom: 40px; font-size: 16px;">
                    <?php echo nl2br(htmlspecialchars($product['description'])); ?>
                </div>
                
                <!-- Specifications Section -->
                <div class="specs-section" style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px; font-size: 18px;">Specifications</h3>
                    <div class="specs-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="spec-item">
                            <strong>Category:</strong> <?php echo htmlspecialchars($product['category']); ?>
                        </div>
                        <div class="spec-item">
                            <strong>SKU:</strong> BYTE-<?php echo str_pad($product['id'], 5, '0', STR_PAD_LEFT); ?>
                        </div>
                        <div class="spec-item">
                            <strong>Availability:</strong> <span style="color: green;">In Stock</span>
                        </div>
                        <div class="spec-item">
                            <strong>Warranty:</strong> 1 Year
                        </div>
                    </div>
                </div>
                
                <div class="actions" style="display: flex; gap: 20px;">
                    <!-- JS will pick up this button for cart functionality -->
                    <div class="product-card" style="display: none;"><!-- Hidden div to make script.js selector work without rewriting script -->
                        <span class="product-title"><?php echo htmlspecialchars($product['name']); ?></span>
                        <span class="product-price">$<?php echo htmlspecialchars($product['price']); ?></span>
                        <img src="<?php echo htmlspecialchars($product['image_path']); ?>">
                    </div>
                    
                    <button class="btn btn-secondary add-to-cart-trigger" 
                            data-id="<?php echo $product['id']; ?>" 
                            data-name="<?php echo htmlspecialchars($product['name']); ?>"
                            data-price="<?php echo htmlspecialchars($product['price']); ?>"
                            data-image="<?php echo htmlspecialchars($product['image_path']); ?>"
                            style="flex: 1; padding: 18px 20px; font-size: 16px;">Add to Cart</button>
                    
                    <button class="btn btn-white" style="width: 60px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd;">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                
                <div class="trust-badges" style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #eee; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                    <div class="badge-item" style="text-align: center;">
                        <i class="fas fa-truck" style="color: #204647; font-size: 24px; margin-bottom: 10px;"></i>
                        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 5px;">Free Shipping</h4>
                        <p style="font-size: 12px; color: #999;">On orders over $100</p>
                    </div>
                    <div class="badge-item" style="text-align: center;">
                        <i class="fas fa-shield-alt" style="color: #204647; font-size: 24px; margin-bottom: 10px;"></i>
                        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 5px;">Secure Payment</h4>
                        <p style="font-size: 12px; color: #999;">100% Protected</p>
                    </div>
                    <div class="badge-item" style="text-align: center;">
                        <i class="fas fa-undo" style="color: #204647; font-size: 24px; margin-bottom: 10px;"></i>
                        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 5px;">Easy Returns</h4>
                        <p style="font-size: 12px; color: #999;">30 Day Policy</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Mobile Responsive Styles injected inline for immediate fix -->
<style>
@media (max-width: 768px) {
    .product-detail-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
    }
    .main-image {
        padding: 20px !important;
    }
}
</style>

<script>
// Specific script for the detail page to handle the custom button structure
document.querySelector('.add-to-cart-trigger').addEventListener('click', function() {
    const btn = this;
    const product = {
        id: btn.dataset.id,
        title: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
        quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Call global function if available, or fallback
    if (typeof showNotification === 'function') {
        showNotification(`${product.title} added to cart!`);
    } else {
        alert(`${product.title} added to cart!`);
    }
    
    if (typeof renderCartModal === 'function') {
        renderCartModal();
    }
});
</script>

<?php include '../partials/footer.php'; ?>


