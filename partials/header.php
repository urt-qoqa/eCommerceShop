<?php
require_once __DIR__ . '/../backend/helpers/SessionHelper.php';
// Header shared template with improved mobile responsiveness
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ByteHub - Premium Tech Shop for laptops, smartphones, and accessories">
    <meta name="keywords" content="tech, laptops, smartphones, accessories, electronics">
    <title>ByteHub - Premium Tech Shop</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="icon" type="image/svg+xml" href="../logo.svg">
    <link rel="stylesheet" href="../cart-fix.css">
    <style>
        /* Enhanced mobile responsive header */
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .header-actions {
                gap: 8px !important;
            }
            
            .user-menu span {
                display: none !important;
            }
            
            .logo-text {
                font-size: 18px !important;
            }
            
            .dropdown-menu {
                position: fixed !important;
                top: 60px !important;
                left: 20px !important;
                right: 20px !important;
                min-width: auto !important;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
            }
        }
        
        /* Improved dropdown accessibility */
        .dropdown-toggle:focus + .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        /* Cart modal mobile responsive */
        @media (max-width: 480px) {
            .cart-modal {
                width: 100% !important;
                right: 0 !important;
            }
        }
        
        /* Add loading states */
        .btn.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Better focus states */
        .nav-link:focus,
        .icon-btn:focus,
        .btn:focus {
            outline: 2px solid #204647;
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="skip-link" style="position: absolute; top: -40px; left: 6px; background: #204647; color: white; padding: 8px; text-decoration: none; border-radius: 4px; z-index: 10001;">Skip to main content</a>
    
    <!-- Header -->
    <header class="header" role="banner">
        <div class="container">
            <div class="header-content">
                <a href="index.php" class="logo" aria-label="ByteHub Home">
                    <span class="logo-text">ByteHub</span>
                </a>

                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" id="mobileMenuBtn" style="display: none;" aria-label="Toggle menu" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                </button>

                <nav class="nav" id="mainNav" role="navigation" aria-label="Main navigation">
                    <a href="index.php" class="nav-link" <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'aria-current="page"' : ''; ?>>Home</a>
                    <a href="products.php" class="nav-link" <?php echo basename($_SERVER['PHP_SELF']) == 'products.php' ? 'aria-current="page"' : ''; ?>>Products</a>
                    <div class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                            Categories <i class="fas fa-chevron-down" style="font-size: 12px;"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a href="products.php?category=Laptops" class="dropdown-item">Laptops</a>
                            <a href="products.php?category=Phones" class="dropdown-item">Phones</a>
                            <a href="products.php?category=Accessories" class="dropdown-item">Accessories</a>
                        </div>
                    </div>
                    <a href="news.php" class="nav-link" <?php echo basename($_SERVER['PHP_SELF']) == 'news.php' ? 'aria-current="page"' : ''; ?>>News</a>
                    <a href="about.php" class="nav-link" <?php echo basename($_SERVER['PHP_SELF']) == 'about.php' ? 'aria-current="page"' : ''; ?>>About</a>
                    <a href="contact.php" class="nav-link" <?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'aria-current="page"' : ''; ?>>Contact</a>
                    <?php if (SessionHelper::isManager()): ?>
                        <a href="admin_dashboard.php" class="nav-link admin-link" style="color: #204647; font-weight: bold;">Dashboard</a>
                    <?php endif; ?>
                </nav>

                <div class="header-actions">

                    <!-- Search Bar (improved) -->
                    <div class="search-bar" style="display: none;">
                        <input type="search" placeholder="Search products..." aria-label="Search products">
                        <i class="fas fa-search" style="color: #999;"></i>
                    </div>
                    
                    <!-- Cart Button with count -->
                    <button class="icon-btn" id="cartBtn" aria-label="Shopping cart">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cartCount" style="display: none;">0</span>
                    </button>

                    <?php if (SessionHelper::isLoggedIn()): ?>
                        <div class="user-menu" style="display: flex; align-items: center; gap: 10px;">
                            <span class="user-welcome" style="font-size: 14px; font-weight: 500;">Hi, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                            <a href="logout.php" class="btn btn-secondary" style="padding: 5px 12px; font-size: 12px; border-radius: 4px;">Logout</a>
                        </div>
                    <?php else: ?>
                        <a href="login.php" class="icon-btn" title="Login" aria-label="Login">
                            <i class="fas fa-user"></i>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" role="main">

    <!-- Cart Modal -->
    <div class="cart-modal-overlay" id="cartModalOverlay" style="display: none;" aria-hidden="true"></div>
    <div class="cart-modal" id="cartModal" style="display: none;" aria-hidden="true" role="dialog" aria-labelledby="cartTitle">
        <div class="cart-header">
            <h3 id="cartTitle">Shopping Cart</h3>
            <button id="cartModalClose" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-content" id="cartModalContent">
            <!-- Cart items will be injected here by JS -->
        </div>
        <div class="cart-footer">
            <div class="cart-subtotal">
                <span>Subtotal:</span>
                <span id="cartSubtotal">$0.00</span>
            </div>
            <button id="checkoutBtn" class="btn btn-primary" onclick="window.location.href='checkout.php'">Checkout</button>
        </div>
    </div>
    
    <script src="script.js"></script>
    <script src="cart.js"></script>
