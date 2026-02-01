<?php
require_once 'models/Product.php';
require_once 'models/Category.php';

$productModel = new Product();
$categoryModel = new Category();

$category = isset($_GET['category']) ? $_GET['category'] : null;
$products = $productModel->getAll($category);
$categories = $categoryModel->getAll();

include '../partials/header.php';
?>

<div class="container" style="padding-top: 40px; padding-bottom: 40px;">
    
    <!-- Category Filter -->
    <div class="category-filter" style="margin-bottom: 30px; text-align: center;">
        <div class="filter-tabs" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <a href="products.php" class="filter-tab <?php echo !$category ? 'active' : ''; ?>" style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 20px; text-decoration: none; color: <?php echo !$category ? '#204647' : '#666'; ?>; background: <?php echo !$category ? '#204647' : 'white'; ?>; color: <?php echo !$category ? 'white' : '#666'; ?>;">All Products</a>
            <?php foreach($categories as $cat): ?>
            <a href="products.php?category=<?php echo urlencode($cat['name']); ?>" class="filter-tab <?php echo $category == $cat['name'] ? 'active' : ''; ?>" style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 20px; text-decoration: none; <?php echo $category == $cat['name'] ? 'background: #204647; color: white; border-color: #204647;' : 'color: #666; background: white;'; ?>"><?php echo htmlspecialchars($cat['name']); ?></a>
            <?php endforeach; ?>
        </div>
    </div>

    <h1 class="section-title" style="text-align: center; margin-bottom: 40px;">
        <?php echo $category ? htmlspecialchars($category) : 'All Products'; ?>
        <span style="font-size: 16px; color: #666; font-weight: normal; margin-left: 10px;">
            (<?php echo count($products); ?> items)
        </span>
    </h1>
    
    <?php if(empty($products)): ?>
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; color: #ddd; margin-bottom: 20px;">ðŸ“¦</div>
            <h3 style="color: #666; margin-bottom: 10px;">No products found</h3>
            <p style="color: #999;">No products available in this category yet.</p>
            <a href="products.php" class="btn btn-primary" style="margin-top: 20px;">View All Products</a>
        </div>
    <?php else: ?>
        <div class="products-grid">
            <?php foreach($products as $product): ?>
            <div class="product-card">
                <a href="product.php?id=<?php echo $product['id']; ?>" style="text-decoration: none; color: inherit; display: block;">
                    <div class="product-image">
                        <?php if($product['image_url']): ?>
                        <img src="<?php echo htmlspecialchars($product['image_url']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" style="width: 100%; height: 100%; object-fit: contain;">
                        <?php else: ?>
                        <div style="width: 100%; height: 100%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>
                        <?php endif; ?>
                    </div>
                    <div class="product-info" style="padding: 15px;">
                        <h3 class="product-title" style="margin: 0 0 10px 0; font-size: 16px; color: #1a1a1a;"><?php echo htmlspecialchars($product['name']); ?></h3>
                        <p class="product-price" style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #204647;">$<?php echo number_format($product['price'], 2); ?></p>
                        <?php if($product['category_name']): ?>
                        <span style="display: inline-block; background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 12px; font-size: 12px; margin-bottom: 10px;">
                            <?php echo htmlspecialchars($product['category_name']); ?>
                        </span>
                        <?php endif; ?>
                        <p class="product-description" style="margin: 0; color: #666; font-size: 14px; line-height: 1.4;"><?php echo htmlspecialchars(substr($product['description'], 0, 80)); ?>...</p>
                    </div>
                </a>
                <div class="product-actions" style="padding: 0 15px 15px;">
                    <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(<?php echo $product['id']; ?>, '<?php echo htmlspecialchars($product['name'], ENT_QUOTES); ?>', <?php echo $product['price']; ?>, '<?php echo htmlspecialchars($product['image_url'] ?? '', ENT_QUOTES); ?>')">Add to Cart</button>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<script>
async function addToCart(productId, productName, price) {
    try {
        const response = await fetch('cart_ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=add&product_id=${productId}&quantity=1`
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update cart count in header if available
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + 1;
            }
            
            // Show success notification
            showNotification(`${productName} added to cart!`, 'success');
        } else {
            showNotification(result.error || 'Failed to add to cart', 'error');
        }
    } catch (error) {
        console.error('Cart error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
</script>

<?php include '../partials/footer.php'; ?>


