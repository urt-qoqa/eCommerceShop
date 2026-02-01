<?php
require_once 'models/Product.php';
$productModel = new Product();
// Get first 6 products as featured
$products = array_slice($productModel->getAll(), 0, 6);

include '../partials/header.php';
?>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-left">
                    <span class="badge">NEW ARRIVAL 2025</span>
                    <h1 class="hero-title">
                        Premium Tech<br>
                        <span class="hero-accent">For Modern Life</span><br>
                        Delivered Fast
                    </h1>
                    <p class="hero-description">
                        Discover the latest laptops, smartphones, and accessories from top brands. Experience cutting-edge technology with exceptional quality and unbeatable prices.
                    </p>
                    <a href="products.php" class="btn btn-primary">
                        Shop Now
                    </a>
                </div>

                <div class="hero-right">
                    <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop" alt="Premium Tech Products" class="hero-image">
                </div>
            </div>
        </div>
    </section>

    <!-- Best Selling Products -->
    <section class="products-section">
        <div class="container">
            <p class="section-label">FEATURED</p>
            <h2 class="section-title">Best Selling<br>Products</h2>

            <div class="products-grid">
                <?php foreach($products as $product): ?>
                <div class="product-card">
                    <a href="product.php?id=<?php echo $product['id']; ?>" style="text-decoration: none; color: inherit; display: block;">
                        <div class="product-image">
                            <img src="<?php echo htmlspecialchars($product['image_url'] ?? ''); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                        <h3 class="product-title"><?php echo htmlspecialchars($product['name']); ?></h3>
                        <p class="product-price">$<?php echo number_format($product['price'], 2); ?></p>
                        <p class="product-description"><?php echo htmlspecialchars(substr($product['description'], 0, 100)); ?>...</p>
                    </a>
                    <button class="btn btn-secondary" onclick="addToCart(<?php echo $product['id']; ?>, '<?php echo htmlspecialchars($product['name'], ENT_QUOTES); ?>', <?php echo $product['price']; ?>, '<?php echo htmlspecialchars($product['image_url'] ?? '', ENT_QUOTES); ?>')">Add to Cart</button>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="view-all">
                <a href="products.php" class="btn btn-primary">
                    View All Products
                </a>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
        <div class="container">
            <h2 class="section-title-center">Shop by Category</h2>
            <p class="section-subtitle">Find exactly what you need</p>

            <div class="categories-grid">
                <a href="products.php?category=Laptops" class="category-card" style="text-decoration: none; color: inherit;">
                    <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop" alt="Premium Laptops" loading="lazy">
                    <div class="category-content">
                        <h3 class="category-title">Laptops</h3>
                    </div>
                </a>

                <a href="products.php?category=Phones" class="category-card" style="text-decoration: none; color: inherit;">
                    <img src="https://images.unsplash.com/photo-1598327104095-b418aa0bd2eb?w=600&auto=format&fit=crop" alt="Latest Smartphones" loading="lazy">
                    <div class="category-content">
                        <h3 class="category-title">Phones</h3>
                    </div>
                </a>

                <a href="products.php?category=Accessories" class="category-card" style="text-decoration: none; color: inherit;">
                    <img src="https://images.unsplash.com/photo-1527864550417-7fd9fc6a0faf?w=600&auto=format&fit=crop" alt="Tech Accessories" loading="lazy">
                    <div class="category-content">
                        <h3 class="category-title">Accessories</h3>
                    </div>
                </a>
            </div>
        </div>
    </section>

<?php include '../partials/footer.php'; ?>


